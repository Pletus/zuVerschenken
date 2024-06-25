import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
  const [searchQuery, setSearchQuery] = useState({ item: "", postCode: "" });

  const handleSearch = (item, postCode) => {
    setSearchQuery({ item, postCode });
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <main>
        <Outlet context={[searchQuery]} />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Layout;