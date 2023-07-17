import React, { useState, useLayoutEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import background from "../Moon.svg";
import axios from "axios";

function DashBoard() {


  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        minWidth: "100%",
        height: "100vh",
        backgroundSize: "cover",
        position: "fixed",
      }}
    >
      <h1 style={{ padding: "40px" }}>Dashboard</h1>
      <div style={{ paddingLeft: "5vw" }}>
        <div class="project-glass" style={{ width: "300px" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      {/* <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>Hi</div> */}
    </div>
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
