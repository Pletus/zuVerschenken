import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/CSS/AddItem.css";
import Swal from "sweetalert2";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

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
    }
  }, []);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("postedBy", userId);

    const location = { city, street, houseNumber: houseNumber || "" };
    formData.append("location", JSON.stringify(location));

    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log("Form Data: ");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://zuverschenken.onrender.com/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setDescription("");
      setCity("");
      setStreet("");
      setHouseNumber("");
      setImages([]);
      Swal.fire({
        title: "Success!",
        text: "Item added successfully!",
        icon: "success"
      });
      console.log("Response data:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
        console.error("Server responded with data:", error.response.data);
        setMessage(`Error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("Network error: Please check your connection.");
      } else {
        console.error("Error setting up the request:", error.message);
        setMessage("An error occurred. Please try again.");
      }
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="background-image w-screen flex items-center justify-center">
      <div className="max-w-md mx-auto shadow-md opacity-80 bg-blue-50 rounded-lg flex flex-col justify-center items-center my-10">
        {message && <p className="text-red-500">{message}</p>}
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          className="w-full p-6"
        ><div className="w-full  rounded-t-lg">
          <h2 className="text-2xl font-bold text-center mb-4  text-blue-700">
            Add New Box
          </h2>
        </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="text-blue-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-400 rounded w-full py-3 px-3 bg-inherit leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="text-blue-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-blue-400 rounded w-full py-3 px-3 bg-inherit h-48 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="text-sm font-bold mb-2 text-blue-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-blue-400 rounded w-full py-3 px-3 bg-inherit text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="w-2/3 pr-2">
              <label
                htmlFor="street"
                className="text-sm font-bold mb-2 text-blue-700"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border border-blue-400 rounded w-full py-3 px-3 bg-inherit text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-1/3 pl-2">
              <label
                htmlFor="houseNumber"
                className="text-sm font-bold mb-2 text-blue-700"
              >
                House Nr.
              </label>
              <input
                type="text"
                id="houseNumber"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                className="border border-blue-400 rounded w-full py-3 px-3 bg-inherit text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="text-blue-700 text-sm font-bold mb-2"
            >
              <span>Images </span> 
            </label>
            <input
              type="file"
              name="images"
              id="fileInput"
              multiple
              onChange={handleImageChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;