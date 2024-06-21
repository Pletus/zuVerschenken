import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 shadow-md bg-customGray fixed top-0 left-0">
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
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Search</button>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8 ml-4">
        <Link to="/" className="text-gray-700">Home</Link>
        <Link to="/add-item" className="text-gray-700">Add Item</Link>
        <Link to="/wishlist" className="text-gray-700">Wishlist</Link>

        {/* User Icon */}
        <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
    </nav>
  );
};


export default Navbar;