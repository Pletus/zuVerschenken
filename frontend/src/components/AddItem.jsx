import React, { useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  // Hardcoded user ID for testing purposes
  const userId = "60d0fe4f5311236168a109ca"; // Replace with an actual user ID

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("postedBy", userId);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Item created successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
      console.log(formData);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      setMessage("Error creating item. Please try again.");
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="background-image h-screen w-screen content-center">
      <div className="max-w-md mx-auto shadow-md opacity-80 bg-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Add New Item
        </h2>
        {message && <p className="mb-4">{message}</p>}
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-blue-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-700 rounded w-full py-3 px-3 bg-inherit text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-blue-900 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-blue-700 rounded bg-inherit h-48 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-bold mb-2 text-blue-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-blue-700 rounded w-full py-3 px-3 bg-inherit text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-blue-900 text-sm font-bold mb-2"
            >
              Images
            </label>
            <input
              type="file"
              name="images"
              id="fileInput"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
