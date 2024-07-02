import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-customDBlue text-black font-semibold pt-20 pb-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/about-us" className="text-lg hover:text-gray-400">
          About Us
        </Link>
        <div className="flex items-center">
          <Link to="/contact-us" className="text-lg mr-4 hover:text-gray-400">
            Contact Us
          </Link>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 w-8 h-8 flex items-center justify-center">
              F
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-400 w-8 h-8 flex items-center justify-center">
              L
            </a>
            <a href="mailto:someone@example.com" className="bg-gray-400 w-8 h-8 flex items-center justify-center">
              @
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        &copy; 2024 all rights reserved
      </div>
    </footer>
  );
};

export default Footer;