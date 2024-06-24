// src/components/OneCard.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const OneItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const[activeiImg, setActiveImg] = useState([])

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/items/${id}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching item", err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col justify-between">
        <img
          src={item.images[0]?.url}
          alt={item.title}
          className="w-full h-full aspect-square oject-cover"
        />
        <div className="flex flow-row justify-between h-40">
          {item.images.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={`${item.title} ${index + 1}`}
                className="w-40 h-40 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold">{item.title}</h3>
        <p>{item.description}</p>
        <p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.location}
          </a>
        </p>
      </div>
    </div>
  );
};

export default OneItem;
