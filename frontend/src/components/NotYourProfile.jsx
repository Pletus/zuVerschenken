import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "../App.css";

function NotYourProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 2;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < filteredItems.length
        ? prevIndex + itemsPerPage
        : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0
        ? prevIndex - itemsPerPage
        : Math.max(filteredItems.length - itemsPerPage, 0)
    );
  };

  const currentItems = filteredItems.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  useEffect(() => {
    const filtered = items.filter((item) => item.postedBy._id === user._id);
    setFilteredItems(filtered);
  }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/items/`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-32 my-28">
      <div className="mt-6">
        <img
          src={user.image.url}
          alt="profile-picture"
          className="w-44 rounded-lg border-2 border-black drop-shadow-xl auto"
        />
        <h1 className="text-4xl text-black p-2 mt-2 text-center">{user.username}</h1>
      </div>
      <div className="drop-shadow-xl shadow-xl p-4 rounded-lg">
        <div className="flex p-2 items-center justify-between">
          <h3 className="text-2xl">Posted boxes</h3>
          <div className="flex justify-end gap-2 mt-1 rounded-lg w-auto">
            {currentIndex === 0 ? null : (
              <button
                onClick={handlePrev}
                className="border-2 drop-shadow-md border-black text-black p-2 rounded-lg"
              >
                &lt;
              </button>
            )}
            {currentIndex + itemsPerPage < filteredItems.length && (
              <button
                onClick={handleNext}
                className="border-2 drop-shadow-md border-black text-black p-2 rounded-lg mx-2"
              >
                &gt;
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row rounded-lg justify-end gap-4">
          {currentItems.map((item) => (
            <NavLink to={`/items/${item._id}`}>
              <div
                key={item.id}
                className="flex flex-col rounded-lg justify-between bg-gray-300 bg-opacity-40 shadow-md bg-opacity-80 p-3 h-full w-64"
              >
                <div>
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-32 rounded-lg object-cover"
                  />
                  <h3 className="text-xl pt-2 text-black text-center">
                    {item.title}
                  </h3>
                </div>
                <p className=" bg-blue-700 text-center bg-opacity-70 text-white rounded-lg p-2 mt-2">
                  {item.location.city}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotYourProfile;
