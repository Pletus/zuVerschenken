// src/components/OneCard.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";;
import moment from 'moment'

const OneItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

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

  const handleThumbnailClick = (index) => {
    setActiveImg(index);
  };

  return (
    <div className="max-w-screen-2xl mx-auto bg-slate-100 mt-10 ">
      <div className="flex flex-col justify-center items-center lg:flex-row gap-16 lg:items-center p-8">
        <div className="flex flex-col lg:w-1/2 ">
          <img
            src={item.images[activeImg]?.url}
            alt={item.title}
            className="w-full h-full  aspect-square object-cover rounded-xl mb-4"
          />
          <div className="flex flow-row justify-center gap-10 h-24">
            {item.images.slice(0, 3).map((image, index) => (
              <div key={index}>
                <img
                  key={index}
                  src={image.url}
                  alt={`${item.title} ${index + 1}`}
                  className={`w-24 h-24 rounded-md gap-2 cursor-pointer ${
                    index === activeImg
                      ? "border-2 border-black"
                      : "border-2 border-transparent"
                  }}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2 p-4">
          <h3 className="font-bold text-3xl">{item.title}</h3>
          <span className="text-grey-700 lg:w-3/4">{item.description}</span>
          <div>
            <a
              className="text-lg font-semibold"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                item.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.location}
            </a>
            <p className="mt-2">
              <strong>Created At:</strong>{" "}
              {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        </div>
      </div>
    </div>
     );
};

export default OneItem;
