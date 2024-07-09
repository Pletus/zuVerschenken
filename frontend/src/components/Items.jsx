import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { parseISO, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import axios from "axios";
import pin from "../assets/icon-location.png";
import "../components/CSS/Items.css";

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
        const response = await axios.get("https://zuverschenken.onrender.com/api/items");
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
      ? item.location.city.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    const matchesCity = searchQuery.city
      ? item.location.city.toLowerCase().includes(searchQuery.city.toLowerCase())
      : true;
    return matchesItem && matchesPostCode && matchesCity;
  });

  return (
    filteredItems.length > 0 ? (
      <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 lg:px-32 2xl:px-72 gap-2 p-4 bg-blue-400 bg-opacity-60">
        {filteredItems.map((item) => {
          const createdAt = item.createdAt ? parseISO(item.createdAt) : null;
          let timeAgo = "Date not available";

          if (createdAt) {
            const now = new Date();
            const days = differenceInDays(now, createdAt);
            const hours = differenceInHours(now, createdAt) % 24;
            const minutes = differenceInMinutes(now, createdAt) % 60;

            if (days > 0) {
              timeAgo = `${days}d ago`;
            } else if (hours > 0) {
              timeAgo = `${hours}h ago`;
            } else {
              timeAgo = `${minutes}min ago`;
            }
          }

          return (
            <div
              key={item._id}
              className="bg-white px-4 md:px-5 itemDiv shadow-2xl rounded-lg flex flex-col gap-2 items-center justify-between"
            >
              <Link to={`/items/${item._id}`}>
                <img
                  src={item.images[0]?.url || "default-image-url"}
                  alt={item.title}
                  className="w-40 h-40 object-cover shadow-md roundedlg mt-4"
                />
              </Link>
              <div className="flex flex-col text-center font-f mt-0 md:pt-4 lg:p-2 xl:p-4 pl-4 gap-1">
                <span className=" font-bold">{item.title}</span>
                <div>
                  <span className="italic">{timeAgo} </span>
                  <span className="text-black">by {item.postedBy.username}</span>
                </div>
                <div className="font-bold">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${item.location.city} ${item.location.street} ${item.location.houseNumber}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.location.city}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div>No items found.</div>
    )
  );
}

export default Items;