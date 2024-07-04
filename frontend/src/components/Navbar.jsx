import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import logout from "../assets/icon-logout.png";
import login from "../assets/icon-user.png";

const Navbar = ({ onSearch }) => {
  const [user, setUser] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchPostCode, setSearchPostCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      function decodeToken(token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
      }

      const decoded = decodeToken(token);
      const userId = decoded.id;
      setUserId(userId);
      if (userId) {
        fetchImageUrl(userId, token);
      }
    }
  }, []);

  const fetchImageUrl = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}/image`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setImageUrl(response.data.image.url);
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/");
    window.location.reload();
  };

  const handleSearch = () => {
    onSearch(searchItem, searchPostCode);
    navigate("/items");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="flex flex-col lg:flex-row justify-between md:justify-around w-full p-3 shadow-md bg-customGray relative">
      <div className="flex justify-between">
        <div className="flex gap-1 sm:gap-4 lg:pl-1">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="flex items-center space-x-1 sm:space-x-4 lg:space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 w-20 md:w-28 lg:w-40 2xl:w-full border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Post Code"
              value={searchPostCode}
              onChange={(e) => setSearchPostCode(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-2 w-16 md:w-28 lg:w-40 2xl:w-full border border-gray-300 rounded-md"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 w-18 sm:w-20 lg:w-32 text-white bg-blue-500 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <button onClick={handleMenuToggle} className="lg:hidden text-3xl ml-2">
          {isMenuOpen ? (
            <IoCloseOutline size={24} />
          ) : (
            <IoMenuOutline size={24} />
          )}
        </button>
      </div>
      <ul
        className={`flex flex-col md:flex-row lg:flex-row align-middle items-end lg:items-center transition-transform transform ${
          isMenuOpen
            ? "max-h-full opacity-100 pt-1 gap-2 md:gap-4 md:items-center mt-2 md:pl-40"
            : "max-h-0 gap-4 xl:gap-8 2xl:gap-24 opacity-0"
        } overflow-hidden lg:overflow-visible lg:opacity-100 lg:max-h-full w-full lg:w-auto`}
      >
        <li>
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-gray-700"
                } transform transition-transform duration-200 pr-2 flex md:hover:scale-125`
              }
            >
              Home
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="/additem"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-gray-700"
                } transform transition-transform duration-200 pr-2 flex md:hover:scale-125`
              }
            >
              Add Box
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-gray-700"
                } transform transition-transform duration-200 pr-2 flex md:hover:scale-125`
              }
            >
              Boxes
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : "text-gray-700"
                } transform transition-transform duration-200 pr-2 flex md:hover:scale-125`
              }
            >
              Wishlist
            </NavLink>
          </div>
        </li>
        <li>
          <div className="">
            {user ? (
              <div className="flex pr-2 gap-4">
                <NavLink to="/profile" className="rounded-full overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="User"
                    className="object-cover w-10 h-10 rounded-full overflow-hidden"
                  />
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-blue-500 w-10 h-10 rounded-full hover:bg-gray-300"
                >
                  <img src={logout} alt="logout" className="" />
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-500" : "text-gray-700"
                  } transform transition-transform duration-200 pr-2 flex hover:scale-125`
                }
              >
                <button className="bg-blue-500 w-auto h-8 rounded-full hover:bg-gray-300">
                  <img src={login} alt="login" className="w-full h-full" />
                </button>
              </NavLink>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
