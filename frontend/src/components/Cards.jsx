import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./ImageCarousel";
import "../components/CSS/Cards.css";

const Cards = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/items/top");
        const fetchedItems = response.data;

        const shuffledItems = fetchedItems.sort(() => 0.5 - Math.random());

        const selectedItems = shuffledItems.slice(0, 20);

        setItems(selectedItems);
      } catch (err) {
        console.error("Error fetching items", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div className="cardBackground h-[800px] customGrey items-center justify-center flex">
        <div className="container pb-20 m-auto">
          <h1 className="font-bold sans-serif text-5xl pb-20 text-black text-center pt-20">
            Featured Items
          </h1>
          <div className="gd-carousel-wrapper">
            <Carousel
              responsive={responsive}
              customTransition="transform .5s ease-in-out"
              transitionDuration={500}
              showDots={false}
              className="gd-carousel"
              dotListStyle={{ marginBottom: "20px" }}
            >
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card--pri shadow-lg mx-auto flex items-center gap-2"
                >
                  <Link to={`/items/${item._id}`}>
                    <img
                      src={item.images[0]?.url}
                      alt={item.title}
                      className="product--image bg-white justify-center object-cover w-96"
                    />
                    <h2 className="font-bold font-f text-center">{item.title}</h2>
                    <p className="text-center font-f">{item.location.city}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>

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
