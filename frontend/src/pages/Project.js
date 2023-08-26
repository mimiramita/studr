import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import logo from "../PlayLamp.png";
import recent from "../recent.png";
import user from "../user.png";
import { useNavigate } from "react-router-dom";
import line from "../line.png";

function Project() {
  const [height, setHeight] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const [mouse, setMouse] = useState("up");
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [projects, setProjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [username, setUsername] = useState(null);

  const handleMouseDown = (e) => {
    const project_video = document.querySelector(".project_video");
    project_video.style.cssText += "pointer-events: none;";
    setIsResizing(true);
    setMouse("down");
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    setHeight(window.innerHeight - e.clientY);
    setPosition(e.clientY);
  };

  const handleMouseUp = (e) => {
    const project_video = document.querySelector(".project_video");
    project_video.style.cssText += "pointer-events: auto;";
    setIsResizing(false);
    setMouse("up");
  };
  // even for get requests if
  useEffect(() => {
    axios
      .get("http://localhost:8000/project/getrecentprojects/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProjects(response.data.response);
      });
    if (projects.length > 4) {
      setProjects(projects.slice(0, 4));
    }
    axios
      .get("http://localhost:8000/core/getusername/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "applciation/json",
        },
      })
      .then((response) => {
        setUsername(response.data.response);
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
      {projects[0] == null ? (
        <div></div>
      ) : (
        <iframe
          className="project_video"
          width="100%"
          height="100%"
          src={
            "https://www.youtube.com/embed/" +
            projects[0].video_link.slice(
              projects[0].video_link.indexOf("=") + 1
            )
          }
        ></iframe>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          width: "100vw",
          height: `${height}px`,
          backgroundColor: "white",
          overflow: "hidden",
          textAlign: "center",
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
            overflowY: "scroll",
            width: "95%",
            height: `${height-30}px`,
            backgroundColor: "green",
            margin: "auto",
            position: "absolute",
            top: "30px",
            left: "2.5%",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "15px",
          }}
        >
          <form
            // onSubmit={submit}
            style={{margin: "0 auto", width: "100%"}}
          >
                <input type="text" placeholder="Ask any question!" style={{marginRight: "5px", backgroundColor: "#ebeef4", borderRadius: "5px", border: "none", width: "90%"}}/><button>Click</button>
          </form>
        </div>
        <p>
          {mouse} {position} {height}
        </p>
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
