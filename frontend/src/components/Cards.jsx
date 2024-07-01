import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "aos/dist/aos.css";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();

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

  const filteredItems = items.filter((item) => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.location.city.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    return matchesItem && matchesPostCode;
  });

 
  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-5xl font-bold pt-6 px-28 text-white" >Item List</h1>

      <div className="grid-container py-10  px-20">
        {filteredItems.map((item) => (
          <Link to={`/items/${item._id}`} key={item._id} className="product-card">
            <img src={item.images[0]?.url} alt={item.title} className="product-image" />
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="text-black pl-2">
              {item.location.city} {/* Render only the city name */}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
