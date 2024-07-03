import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import {
  parseISO,
  differenceInDays,
  differenceInHours,
} from "date-fns";
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
    <div className="p-4 md:px-32 lg:px-72 xl:px-96 bg-blue-400 bg-opacity-60">
      {filteredItems.map((item) => {
        const createdAt = item.createdAt ? parseISO(item.createdAt) : null;
        let timeAgo = "Date not available";

        if (createdAt) {
          const now = new Date();
          const days = differenceInDays(now, createdAt);
          const hours = differenceInHours(now, createdAt) % 24;

          if (days > 0) {
            timeAgo = `Posted ${days} day and ${hours} hours ago`;
          } else {
            timeAgo = `Posted ${hours} hours ago`;
          }
        }

        return (
          <div
            key={item._id}
            className="flex bg-white shadow-md rounded-lg mb-4 p-4 flex"
          >
            <Link to={`/items/${item._id}`}>
              <img
                src={item.images[0]?.url || "default-image-url"}
                alt={item.title}
                className="w-40 h-40 object-cover rounded-l-lg mr-2"
              />
            </Link>
            <div className="flex flex-col md:mt-4 lg:mt-2 xl:mt-4 pl-4 sm:pl-4 md:pl-8 lg:pl-8 xl:pl-20 gap-1">
              <Link
                className="text-lg font-bold mb-1"
                to={`/items/${item._id}`}
              >
                <span className="pl-1 text-blue-700">{item.title}</span>
              </Link>
              <span className="text-blue-700">{timeAgo}</span>
              <span className="pl-1 text-black">by {item.postedBy.username}</span>
              <div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${item.location.city} ${item.location.street} ${item.location.houseNumber}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-1 text-black hover:underline"
                >at{' '}
                  {item.location.city}, {item.location.street}{" "}
                  {item.location.houseNumber}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Items;
