import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCard = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        setItems(response.data);
      } catch (err) {
        console.error('Error fetching items', err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="product-grid">
      {items.map(item => (
        <div className="product-card" key={item._id}>
          <img
            src={item.images[0]?.url}
            alt={item.title}
            className="product-image"
          />
          <h3 className='font-bold'>{item.title}</h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="location-link"
          >
            {item.location}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
