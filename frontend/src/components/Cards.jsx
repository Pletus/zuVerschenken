import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./ImageCarousel";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchQuery] = useOutletContext();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items/top");
        const fetchedItems = response.data;

        const shuffledItems = fetchedItems.sort(() => 0.5 - Math.random());

        const selectedItems = shuffledItems.slice(0, 10);

        setItems(selectedItems);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div className="cardBackground h-[800px] items-center justify-center flex">
        <div className="container pb-20 m-auto">
          <h1 className="font-bold text-4xl pb-24 text-blue-700 text-center">
            Featured Items
          </h1>
          <Carousel
            responsive={responsive}
            customTransition="transform .5s ease-in-out"
            transitionDuration={500}
            showDots={true}
            dotListStyle={{ marginBottom: "20px" }}
          >
            {items.map((item) => (
              <div
                key={item._id}
                className="card--pri shadow-lg  mx-auto flex items-center gap-2"
              >
                <Link to={`/items/${item._id}`}>
                  <img
                    src={item.images[0]?.url}
                    alt={item.title}
                    className="product--image bg-white justify-center object-cover w-96"
                  />
                  <h2 className="font-bold text-center">{item.title}</h2>
                  <p className="text-center">{item.location.city}</p>
                </Link>
              </div>
            ))}
          </Carousel>
          <div className="flex justify-center items-center mt-20 mb-20">
            <NavLink
              className="loginButton flex justify-center items-center font-bold bg-blue-500 rounded-full text-white"
              type="submit"
              to="/items"
            >
              Click for More
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
