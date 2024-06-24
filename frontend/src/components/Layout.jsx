import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;
