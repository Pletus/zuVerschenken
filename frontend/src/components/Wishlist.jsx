import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { FaTh, FaList, FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); 
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        // Get the wishlist IDs from local storage
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        // Fetch the items using the wishlist IDs
        const itemPromises = wishlist.map(id =>
          axios.get(`http://localhost:8080/api/items/${id}`)
        );

        const itemResponses = await Promise.all(itemPromises);
        const fetchedItems = itemResponses.map(response => response.data);

        setItems(fetchedItems);
      } catch (err) {
        console.error('Error fetching wishlist items', err);
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = (itemId) => {
    try {
      // Get the current wishlist from localStorage
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      // Remove the item ID from the wishlist array
      const updatedWishlist = wishlist.filter(id => id !== itemId);

      // Update localStorage with the updated wishlist
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      // Refresh the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from wishlist', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.location.postCode.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    const matchesCity = searchQuery.city
      ? item.location.city.toLowerCase().includes(searchQuery.city.toLowerCase())
      : true;
    return matchesItem && matchesPostCode && matchesCity;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-black text-xl font-bold mb-4">Wishlist</h2>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-end mb-6">
        <button onClick={() => setViewMode('grid')} className={`mx-2 ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}>
          <FaTh size={24} />
        </button>
        <button onClick={() => setViewMode('list')} className={`mx-2 ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-500'}`}>
          <FaList size={24} />
        </button>
      </div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map(item => (
            <div key={item._id} className="relative bg-white shadow-md rounded-lg overflow-hidden">
              <Link to={`/items/${item._id}`}>
                <img
                  src={item.images[0]?.url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location.city + ' ' + item.location.street + ' ' + item.location.houseNumber)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.location.city}, {item.location.street} {item.location.houseNumber}
                  </a>
                </div>
              </Link>
              <button
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveFromWishlist(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="list-view">
          {currentItems.map(item => (
            <div key={item._id} className="relative  bg-white shadow-md rounded-lg mb-4 p-4">
              <Link to={`/items/${item._id}`}>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location.city + ' ' + item.location.street + ' ' + item.location.houseNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {item.location.city}, {item.location.street} {item.location.houseNumber}
                </a>
              </Link>
              <button
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveFromWishlist(item._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="cursor-pointer">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Wishlist;