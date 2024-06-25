import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between w-full p-4 shadow-md bg-customGray top-0 left-0">
      {/* Logo Placeholder */}
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search for items..."
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Post Code"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
          Search
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8 ml-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-700"
            } transform transition-transform duration-200 hover:scale-125`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/additem"
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-700"
            } transform transition-transform duration-200 hover:scale-125`
          }
        >
          Add Item
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-500" : "text-gray-700"
            } transform transition-transform duration-200 hover:scale-125`
          }
        >
          Wishlist
        </NavLink>

        {/* User Icon */}
        {user ? (
          <>
            <NavLink
              to="/profile"
              className="w-10 h-10 rounded-full overflow-hidden"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="object-cover w-full h-full"
              />
            </NavLink>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-gray-300"
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500" : "text-gray-700"
              } transform transition-transform duration-200 hover:scale-125`
            }
          >
            Log in | Sign up
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;