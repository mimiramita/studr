import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import background from "../Moon.svg";
import axios from "axios";

function DashBoard() {
  const token = sessionStorage.getItem("access_token");
  if (token == null) {
    window.location.href = "/login";
  }
  const [projects, setProjects] = useState([]);
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
  }, []);
  return (
    <div
      class="row"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#f8f7ff" }}
    >
      <div class="col-2" style={{ padding: "15px 25px" }}>
        <div
          style={{
            backgroundColor: "#002855",
            borderRadius: "30px",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
      <div class="col-5" style={{ padding: "15px 25px" }}>
        <div>Welcome back, Tom!</div>
        <div style={{width: "100%", height: "20%", backgroundColor: "#ffffff", borderRadius: "30px"}}></div>
      </div>
      <div class="col-5"></div>
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
    //       {projects.map((project) => (
    //         <div class="col-3">
    //           <div class="project-glass" style={{ width: "320px" }}>
    //             <iframe
    //               style={{ borderRadius: "10px 10px 0px 0px" }}
    //               width="320"
    //               height="180"
    //               src={
    //                 "https://www.youtube.com/embed/" +
    //                 project.video_link.slice(
    //                   project.video_link.indexOf("=") + 1
    //                 )
    //               }
    //             ></iframe>
    //             <div class="card-body">
    //               <p class="card-text">
    //                 <h4>{project.project_name}</h4>
    //                 <div>Created on {project.created_on.slice(0, 10)}</div>
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
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
