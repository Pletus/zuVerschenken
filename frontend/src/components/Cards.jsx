/* import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();

  useEffect(() => {
    Aos.init({ duration: 3000 });
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

  const filteredItems = items.filter((item) => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.location.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    return matchesItem && matchesPostCode;
  });
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-black">
      <h1 className="text-5xl font-bold pt-6 px-20  text-white" data-aos="zoom-in">Item List</h1>

      <div
        className="product-grid py-20 px-20 items-center justify-center"
        data-aos="zoom-in"
      >
        {filteredItems.map((item) => (
          <Link
            to={`/items/${item._id}`}
            key={item._id}
            className="product-card"
          >
            <img
              src={item.images[0]?.url}
              alt={item.title}
              className="product-image"
            />
            <h3 className="font-bold">{item.title}</h3>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                item.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              {item.location}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
 */

/* import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();

  useEffect(() => {
    Aos.init({ duration: 3000 });
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

  const filteredItems = items.filter((item) => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.location.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    return matchesItem && matchesPostCode;
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-5xl font-bold pt-6 px-28 text-white" data-aos="zoom-in">Item List</h1>

      <div
        className="grid-container py-10  px-20"
        data-aos="zoom-in"
      >
        {filteredItems.map((item) => (
          <Link
            to={`/items/${item._id}`}
            key={item._id}
            className="product-card"
          >
            <img
              src={item.images[0]?.url}
              alt={item.title}
              className="product-image"
            />
            <h3 className="font-bold text-white">{item.title}</h3>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                item.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              {item.location}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;

 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();

  useEffect(() => {
    Aos.init({ duration: 3000 });
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

  const filteredItems = items.filter((item) => {
    const matchesItem = searchQuery.item
      ? item.title.toLowerCase().includes(searchQuery.item.toLowerCase())
      : true;
    const matchesPostCode = searchQuery.postCode
      ? item.city.toLowerCase().includes(searchQuery.postCode.toLowerCase())
      : true;
    return matchesItem && matchesPostCode;
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-5xl font-bold pt-6 px-28 text-white" data-aos="zoom-in">Item List</h1>

      <div className="grid-container py-10  px-20" data-aos="zoom-in">
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
