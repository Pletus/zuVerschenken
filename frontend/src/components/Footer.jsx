/* import React from 'react';
import { Link} from 'react-router-dom';

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

export default Footer; */
import { Link } from "react-router-dom";
import logo from "../assets/logo-n.svg";
import fb from "../assets/facebook.svg";
import tw from "../assets/x.svg";
import yt from "../assets/youtube.svg";
import ins from "../assets/instagram.svg";

const Footer = () => {
  return (
    <> <div className="bg-customDBlue  pt-5 pb-5 flex ">
      <div className="w-1/3 flex justify-center items-center ">
        <div className="w-32">
          <li>
            <img src={logo} alt="logo" className="w-full object-cover" />
          </li>
        </div>
      </div>
      <div className="w-1/3 flex-row justify-center items-center">
        <div>
          <ul className="flex flex-row justify-center gap-4 items-center">
            <li>
              <a href="">
                <img src={fb} alt="logo" className="w-10 h-10" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={tw} alt="logo" className="w-10 h-10" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={ins} alt="logo" className="w-12 h-12" />
              </a>
            </li>
            <li>
              <a href="">
                <img src={yt} alt="logo" className="w-12 h-12" />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-evenly mt-5">
          <ul className="flex text-md text-customGray">
            <li className="flex border-r-2 px-4">
              <Link to="/">
                <p> Home </p>
              </Link>
            </li>
            <li className="border-r-2 px-4">
              <Link to="/about-us">
                <p>About us </p>
              </Link>
            </li>
            <li className="border-r-2 px-4">
              <Link to="/privacy-policy">
                <p></p>Privcy Policy{" "}
              </Link>
            </li>
            <li className="px-4">
              <Link to="/contact">
                <p>contact </p>
              </Link>
            </li>
          </ul>
          {/* <p className="text-md text-customGray pt-5">
            <a href="/">Home &nbsp;|</a> <a href="about-us">&nbsp; About Us</a> <a href="/">&nbsp;|
            &nbsp; Privacy Policy </a> <a href="/">&nbsp; | &nbsp; Contact</a>
          </p> */}
        </div>
      </div>
      
    </div><div className="flex justify-center bg-customGray text-xs p-2">
        <p className="">Copyright @ 2024 Freebie It</p>
      </div></>
  );
};

export default Footer;
