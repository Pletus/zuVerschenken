import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
  const [searchQuery, setSearchQuery] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (item, postCode, city) => {
    setSearchQuery({ item, postCode, city });
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <main>
        <Outlet context={[searchQuery, setSearchQuery]} />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;
