import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
          <Navbar />
          <body>
            <Outlet />
          </body>
    </div>
  );
}

export default Layout;
