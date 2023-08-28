import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import logo from "../PlayLamp.png";
import recent from "../recent.png";
import user from "../user.png";
import rightArrow from "../right-arrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import line from "../line.png";

function Project() {
  const [height, setHeight] = useState(120);
  const [isResizing, setIsResizing] = useState(false);
  const [mouse, setMouse] = useState("up");
  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");
  if (token == null) {
    window.location.href = "/login";
  }
  const location = useLocation();
  const questionRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const project = {
      project_name: location.state.projectName,
      question: question,
    };
    if (token == null) {
      window.location.href = "/login";
    }
    try {
      axios.defaults.withCredentials = true; // even for get requests if
      // demand session authentication
      const { data } = await axios.post(
        "http://localhost:8000/project/answerquestion/",
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      alert(e);
    }
    setQuestion(null);
    questionRef.current.value = "";
    axios
      .get("http://localhost:8000/project/getquestions/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          project_id: location.state.projectID,
        },
      })
      .then((response) => {
        setQuestions(response.data.response);
      });
  };
  const handleMouseDown = (e) => {
    const project_video = document.querySelector(".project_video");
    project_video.style.cssText += "pointer-events: none;";
    setIsResizing(true);
    setMouse("down");
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    let new_height = window.innerHeight - e.clientY;
    if (new_height < 100) {
      new_height = 100;
    }
    setHeight(new_height);
  };

  const handleMouseUp = (e) => {
    const project_video = document.querySelector(".project_video");
    project_video.style.cssText += "pointer-events: auto;";
    setIsResizing(false);
    setMouse("up");
  };

  const navigateDashboard = () => {
    navigate("/dashboard");
  }
  // even for get requests if
  useEffect(() => {
    axios
      .get("http://localhost:8000/project/getquestions/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          project_id: location.state.projectID,
        },
      })
      .then((response) => {
        setQuestions(response.data.response);
      });
  }, []);
  // const toProject = (project_id) => {
  //   navigate("/project", {state: {project_id: project_id}})
  // }
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="roboto-mono"
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "#fafcff",
        }}
      >
        <p style={{ padding: "10px", fontSize: "20px", fontWeight: "bold" }}>
          {location.state.projectName}
        </p>
        <div style={{ position: "absolute", right: "200px", top: "5px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              padding: "5px 10px 10px 11px",
              marginRight: "10px",
              textAlign: "center",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              display: "inline-block",
            }}
          >
            <img src={user} width="20px" height="20px"></img>
          </button>
        </div>
        <div
          className="manrope"
          style={{
            display: "inline-block",
            paddingTop: "8px",
            position: "absolute",
            right: "50px",
            top: "5px",
          }}
        >
          Back to dashboard
        </div>
        <div style={{ position: "absolute", right: "0px", top: "7px" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "#fafcff",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              padding: "5px 10px 10px 11px",
              marginRight: "10px",
              textAlign: "center",
              display: "inline-block",
            }}
            onClick={navigateDashboard}
          >
            <img src={rightArrow} width="20px" height="20px"></img>
          </button>
        </div>
      </div>
      <iframe
        className="project_video"
        width="100%"
        height={window.innerHeight - 50 - 100}
        src={
          "https://www.youtube.com/embed/" +
          location.state.projectLink.slice(
            location.state.projectLink.indexOf("=") + 1
          )
        }
      ></iframe>
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100vw",
          height: `${height}px`,
          backgroundColor: "#fafcff",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={line}
          width="40px"
          height="30px"
          style={{ margin: "auto", display: "block" }}
          onMouseDown={handleMouseDown}
        ></img>
        <div
          style={{
            overflow: "scroll",
            width: "95%",
            height: `${height - 30}px`,
            backgroundColor: "#fafcff",
            margin: "auto",
            position: "absolute",
            top: "30px",
            left: "2.5%",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "15px",
            textAlign: "center",
            // flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "95%",
              // height: "auto",
              height: `${height - 110}px`,
              backgroundColor: "#fafcff",
              position: "absolute",
              bottom: "80px",
              left: "2.5%",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column-reverse",
              margin: "auto",
            }}
          >
            <div style={{ backgroundColor: "#fafcff", height: "auto" }}>
              {questions.map((question) => (
                <div
                  className="manrope"
                  style={{
                    width: "max-content",
                    maxWidth: "80%",
                    height: "auto",
                    backgroundColor: "white",
                    margin: "20px",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#aa88d6",
                      padding: "10px",
                      borderRadius: "10px",
                      borderBottomLeftRadius: "0px",
                      borderBottomRightRadius: "0px",
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {question.question}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p style={{ padding: "10px" }}>{question.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            className="manrope"
            onSubmit={submit}
            style={{
              margin: "0 auto",
              width: "100%",
              position: "absolute",
              bottom: "25px",
            }}
          >
            <input
              type="text"
              class="form-control"
              placeholder="Ask any question!"
              ref={questionRef}
              style={{
                marginRight: "10px",
                backgroundColor: "#ebeef4",
                // border: "none",
                width: "90%",
                display: "inline-block",
                // boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
              name="question"
              value={question}
              required
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="submit"
              class="btn btn-primary"
              style={{
                backgroundColor: "#ef7a85",
                border: "none",
                marginBottom: "3px",
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
    //   Hi
    //   {/* <iframe
    //     style={{ borderRadius: "10px 10px 0px 0px" }}
    //     width="100%"
    //     src={
    //       "https://www.youtube.com/embed/" +
    //       projects[0].video_link.slice(projects[0].video_link.indexOf("=") + 1)
    //     }
    //   ></iframe> */}
    // </div>

    // <div
    //   className="manrope"
    //   style={{
    //     backgroundImage: `url(${background})`,
    //     minWidth: "100%",
    //     height: "100vh",
    //     backgroundSize: "cover",
    //     position: "fixed",
    //   }}
    // >
    //   <h1 style={{ padding: "40px" }} className="roboto-mono">
    //     Dashboard
    //   </h1>

    //   <div style={{ paddingLeft: "5vw" }}>
    //     <div class="row">
    // {projects.map((project) => (
    //   <div class="col-3">
    //     <div class="project-glass" style={{ width: "320px" }}>
    //       <iframe
    //         style={{ borderRadius: "10px 10px 0px 0px" }}
    //         width="320"
    //         height="180"
    //         src={
    //           "https://www.youtube.com/embed/" +
    //           project.video_link.slice(
    //             project.video_link.indexOf("=") + 1
    //           )
    //         }
    //       ></iframe>
    //       <div class="card-body">
    //         <p class="card-text">
    //           <h4>{project.project_name}</h4>
    //           <div>Created on {project.created_on.slice(0, 10)}</div>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // ))}
    //     </div>
    //   </div>
    //   {/* <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>Hi</div> */}
    // </div>
  );
}
// function DashBoard() {
//   const [isNavbarVisible, setIsNavbarVisible] = useState(false);
//   const [springs, api] = useSpring(() => ({
//     from: { transform: "translateX(-100%)" },
//   }));

//   const handleClick = () => {
//     setIsNavbarVisible(!isNavbarVisible);
//     api.start({
//       from: {
//         transform: "translateX(-100%)",
//       },
//       to: {
//         transform: "translateX(0)",
//       },
//     });
//   };

//   return (
//     <div>
//       <button
//         className="sidebar-toggle"
//         onClick={handleClick}
//         style={{ position: "absolute", right: "0" }}
//       >
//         Bar
//       </button>
//       <animated.div
//         className="sidebar"
//         style={{
//           //   width: 80,
//           //   height: 80,
//           //   background: "#ff6d6d",
//           //   borderRadius: 8,
//           ...springs,
//         }}
//       >
//         <ul className="sidebar-menu">
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/">
//               Home
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/about">
//               About
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/services">
//               Services
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/contact">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </animated.div>
//     </div>
//   );
//   const [springs, api] = useSpring(() => ({
//     from: { x: 0 },
//   }));

//   const handleClick = () => {
//     api.start({
//       from: {
//         backgroundColor: "white",
//       },
//       to: {
//         backgroundColor: "blue",
//       },
//     });
//   };

//   return (
//     <div>
//       <button
//         className="sidebar-toggle"
//         onClick={handleClick}
//         style={{ position: "absolute", right: "0" }}
//       >
//         {/* <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i> */}Side
//         Bar
//       </button>
//       <animated.div className="sidebar" style={{ ...springs }}>
//         <ul className="sidebar-menu">
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/">
//               Home
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/about">
//               About
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/services">
//               Services
//             </a>
//           </li>
//           <li className="sidebar-item">
//             <a className="sidebar-link" href="/contact">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </animated.div>
//     </div>
//   );
// }
export default Project;
