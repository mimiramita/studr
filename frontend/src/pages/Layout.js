import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../Navbar";
import Navbar_Login from "../Navbar_Login"

const Layout = () => {
  let login = window.location.pathname == "/login";
  let signin = window.location.pathname == "/signin";
  return (
    <>
    {login || signin
        ? <div></div>
        : <Navbar />
      }
      <Outlet />
    </>
  );
};

export default Layout;