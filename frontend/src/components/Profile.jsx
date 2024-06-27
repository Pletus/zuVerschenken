import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Profile() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <section className="flex justify-center min-w-min min-h-screen p-6 md:p-20">
      <div className="responsiveDiv shadow-2xl bg-blue-500 bg-opacity-30 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="object-cover w-48 h-48 rounded-full border-2 border-blue-500 shadow-md"
          />
          <form action="">
            <input
              type="file"
              name="profileImage"
              id="fileInput"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <button className="flex justify-center items-center bg-blue-700 rounded-full text-white p-2">Submit</button>
          </form>
        </div>
        <div className="flex items-center justify-center">Items Posted</div>
        <div className="flex items-center justify-center">Coments</div>
        <div className="flex items-center justify-center">Wishlist</div>
      </div>
    </section>
  );
}

export default Profile;
