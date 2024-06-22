import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8080/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Item created successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
      setImages([]);
    } catch (error) {
        if (error.response) { 
            console.error('Server responded with status:', error.response.status);
        }else {
            console.error('Error setting up the request:', error.message);
          } 
      setMessage('Error creating item. Please try again.');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit} methode= "post" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
          <input
            type="file"
            name="images"
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
  );
};

export default AddItem;
