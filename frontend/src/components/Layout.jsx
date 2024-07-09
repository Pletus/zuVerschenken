import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
  const [searchQuery, setSearchQuery] = useState({});
  
  const handleSearch = (item, postCode, city) => {
    setSearchQuery({ item, postCode, city });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      <main className="flex-grow">
        <Outlet context={[searchQuery, setSearchQuery]} />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;
