import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import axios from "axios";

const Navbar = ({ onSearch }) => {
  const [user, setUser] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [searchPostCode, setSearchPostCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    const list = listRef.current;
    if (!list) return;

    if (isMenuOpen) {
      list.classList.remove("top-[60px]");
      list.classList.remove("opacity-100");
      list.classList.add("absolute");
      list.classList.remove("pointer-events-auto");
    } else {
      list.classList.add("top-[60px]");
      list.classList.add("opacity-100");
      list.classList.remove("absolute");
      list.classList.add("pointer-events-auto");
    }

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
    <nav className="flex items-center justify-between text-center w-full h-16 p-2 md:p-4 shadow-md bg-customGray top-0 left-0">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 w-16 sm:w-20 md:w-40 lg:w-full border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Post Code"
          value={searchPostCode}
          onChange={(e) => setSearchPostCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 w-16 sm:w-20 md:w-40 lg:w-full border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 w-20 sm:w-20 md:w-40 lg:w-full text-white bg-blue-500 rounded-md"
        >
          Search
        </button>
        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? (
              <IoCloseOutline size={24} />
            ) : (
              <IoMenuOutline size={24} />
            )}
          </button>
        </span>
      </div>
      <ul ref={listRef} className="flex items-center space-x-8 ml-4">
        <li>
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
        </li>
        <li>
          <NavLink
            to="/additem"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500" : "text-gray-700"
              } transform transition-transform duration-200 hover:scale-125`
            }
          >
            Add Box
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              `${
                isActive ? "text-blue-500" : "text-gray-700"
              } transform transition-transform duration-200 hover:scale-125`
            }
          >
            Boxes
          </NavLink>
        </li>
        <li>
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
        </li>
      </ul>
      <div className="flex flex-row gap-2">
        {user ? (
          <>
            <NavLink
              to="/profile"
              className="w-10 h-10 rounded-full overflow-hidden"
            >
              <img
                src={imageUrl}
                alt="User"
                className="object-cover w-10 h-10 rounded-full overflow-hidden"
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
