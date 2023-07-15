import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import background from "../Moon.svg";

function DashBoard() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        minWidth: "100%",
        height: "100vh",
        backgroundSize: "cover",
        position: "fixed"
      }}
    ></div>
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
