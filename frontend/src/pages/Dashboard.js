import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import logo from "../PlayLamp.png";
import recent from "../recent.png";
import user from "../user.png";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("access_token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [projects, setProjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [username, setUsername] = useState(null);
  const navigateCreateProject = () => {
    navigate("/createproject");
  };

  const toProject = (projectName, projectLink, projectID) => {
    navigate("/project", {
      state: { projectName: projectName, projectLink: projectLink, projectID: projectID },
    });
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
    // axios
    //   .get("http://localhost:8000/core/getfolders/", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "applciation/json",
    //     },
    //   })
    //   .then((response) => {
    //     setFolders(response.data.response);
    //   });
  }, []);
  return (
    <div class="container-fluid">
      <div class="row" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          class="col-2"
          style={{
            backgroundColor: "white",
            height: "100vh",
            padding: "0px",
            textAlign: "center",
          }}
        >
          <br></br>
          <img
            src={logo}
            width="170px"
            height="45px"
            style={{ margin: "auto", display: "block" }}
          ></img>
          <br></br>
          <button
            className="roboto-mono"
            style={{
              fontSize: "14px",
              backgroundColor: "#815AC0",
              width: "180px",
              height: "40px",
              borderRadius: "10px",
              color: "#FFFFFF",
              textAlign: "center",
              margin: "auto",
              border: "none",
            }}
          >
            Dashboard
          </button>
          <button
            className="roboto-mono"
            style={{
              fontSize: "14px",
              backgroundColor: "white",
              width: "180px",
              height: "40px",
              borderRadius: "10px",
              color: "#6c757d",
              textAlign: "center",
              margin: "auto",
              border: "none",
              marginTop: "3px",
            }}
            onClick={navigateCreateProject}
          >
            New Project
          </button>
        </div>
        <div
          class="col-10"
          style={{
            padding: "0px",
            margin: "0",
            backgroundColor: "#fafcff",
            height: "100vh",
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginLeft: "50px",
              marginTop: "20px",
            }}
          >
            <div className="roboto-mono" style={{ fontSize: "20px" }}>
              Hi, {username}
            </div>
            <div className="roboto-mono" style={{ fontSize: "30px" }}>
              Welcome Back!
            </div>
            <div style={{ position: "absolute", right: "50px", top: "20px" }}>
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  width: "200px",
                  display: "inline",
                  float: "right",
                  backgroundColor: "#EBEEF5",
                }}
              ></input>
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
                }}
              >
                <img src={user} width="20px" height="20px"></img>
              </button>
            </div>
          </div>
          <br></br>
          <div
            style={{
              width: "90%",
              height: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "20px 50px",
              padding: "30px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={recent}
              width="40px"
              height="40px"
              style={{ display: "inline" }}
            ></img>
            <h1
              class="roboto-mono"
              style={{
                display: "inline",
                paddingLeft: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Recent Projects
            </h1>
            <br></br>
            <br></br>
            <div class="row">
              {projects.map((project) => (
                <div class="col-4">
                  <div
                    style={{
                      width: "280px",
                      borderRadius: "10px",
                      backgroundColor: "#B185DB",
                      color: "white",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <iframe
                      style={{ borderRadius: "10px 10px 0px 0px" }}
                      width="280"
                      height="150"
                      src={
                        "https://www.youtube.com/embed/" +
                        project.video_link.slice(
                          project.video_link.indexOf("=") + 1
                        )
                      }
                    ></iframe>
                    <a onClick={() => toProject(project.project_name, project.video_link, project.project_id)}>
                      <div class="card-body">
                        <p
                          class="card-text roboto-mono"
                          style={{ padding: "0px 10px 10px 10px" }}
                        >
                          <h5
                            className="manrope"
                            style={{
                              fontWeight: "bold",
                              fontSize: "16px",
                              marginBottom: "0",
                            }}
                          >
                            {project.project_name}
                          </h5>
                          <div className="manrope" style={{ fontSize: "12px" }}>
                            {project.created_on.slice(0, 10)}
                          </div>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              width: "90%",
              height: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              margin: "10px 50px",
              padding: "30px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={recent}
              width="40px"
              height="40px"
              style={{ display: "inline" }}
            ></img>
            <h1
              class="roboto-mono"
              style={{
                display: "inline",
                paddingLeft: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Recent Projects
            </h1>
            <br></br>
            <br></br>
            <div class="row">
              {projects.map((project) => (
                <div class="col-3">
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      backgroundColor: "#B185DB",
                      color: "white",
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <iframe
                      style={{ borderRadius: "10px 10px 0px 0px" }}
                      width="200"
                      height="100"
                      src={
                        "https://www.youtube.com/embed/" +
                        project.video_link.slice(
                          project.video_link.indexOf("=") + 1
                        )
                      }
                    ></iframe>
                    <div class="card-body">
                      <p
                        class="card-text roboto-mono"
                        style={{ padding: "0px 10px 10px 10px" }}
                      >
                        <h5
                          style={{
                            fontWeight: "bold",
                            fontWeight: "16px",
                            marginBottom: "0",
                          }}
                        >
                          {project.project_name}
                        </h5>
                        <div style={{ fontSize: "12px" }}>
                          {project.created_on.slice(0, 10)}
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default DashBoard;
