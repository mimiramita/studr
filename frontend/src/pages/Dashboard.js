import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import logo from "../PlayLamp.png";
import recent from "../recent.png";

function DashBoard() {
  const token = sessionStorage.getItem("access_token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [projects, setProjects] = useState([]);
  const [username, setUsername] = useState(null);
  // even for get requests if
  useEffect(() => {
    axios
      .get("http://localhost:8000/project/getprojects/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProjects(response.data.response);
      });
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
          <img
            src={logo}
            width="230px"
            height="110px"
            style={{ margin: "auto", display: "block" }}
          ></img>

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
          </div>
          <div
            style={{
              width: "90%",
              height: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              margin: "50px",
              padding: "15px",
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
                      border: "1px solid rgba( 255, 255, 255, 0.18 )",
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
                      <p class="card-text">
                        <h4>{project.project_name}</h4>
                        <div>Created on {project.created_on.slice(0, 10)}</div>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              width: "80%",
              height: "auto",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              margin: "40px",
              padding: "15px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p1>Recent Projects</p1>
            <br></br>
            <br></br>
            <div class="row">
              {projects.map((project) => (
                <div class="col-3">
                  <div
                    style={{
                      width: "200px",
                      borderRadius: "10px",
                      border: "1px solid rgba( 255, 255, 255, 0.18 )",
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
                      <p class="card-text">
                        <h4>{project.project_name}</h4>
                        <div>Created on {project.created_on.slice(0, 10)}</div>
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
