import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";

function Items() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [globalSearchQuery] = useOutletContext();

  useEffect(() => {
    return () => {
      setSearchQuery({});
    };
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items");
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setSearchQuery(globalSearchQuery);
  }, [globalSearchQuery]);

  const filteredItems = items.filter((item) => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.location.city
          .toLowerCase()
          .includes(searchQuery.postCode.toLowerCase())
      : true;
    const matchesCity = searchQuery.city
      ? item.location.city
          .toLowerCase()
          .includes(searchQuery.city.toLowerCase())
      : true;
    return matchesItem && matchesPostCode && matchesCity;
  });

  return (
    <div className="p-4 md:px-32 lg:px-72 bg-blue-400 bg-opacity-60">
      {filteredItems.map((item) => (
        <div
          key={item._id}
          className="block bg-white shadow-md rounded-lg mb-4 p-4 flex transform transition-transform duration-700 hover:scale-110"
        >
          <Link to={`/items/${item._id}`}>
            <img
              src={item.images[0]?.url || "default-image-url"}
              alt={item.title}
              className="w-40 h-40 object-cover rounded-l-lg mr-4"
            />
          </Link>
          <div>
            <Link className="text-lg shadow-sm rounded-full bg-blue-200 bg-opacity-40 pl-1 mt-6 mb-2" to={`/items/${item._id}`}>
              <span className="p-2 text-blue-700">
                {item.title}
              </span>
            </Link>
            <div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  item.location.city +
                    " " +
                    item.location.street +
                    " " +
                    item.location.houseNumber
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
              >
                {item.location.city}, {item.location.street}{" "}
                {item.location.houseNumber}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Items;
