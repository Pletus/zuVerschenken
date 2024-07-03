import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

function NotYourProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const filtered = items.filter((item) => item.postedBy._id === user._id);
      setFilteredItems(filtered);
      console.log(filteredItems)
  }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/items/`);
        const data = await response.json();
          setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(response.data);
        console.log(response.data); // Para verificar los datos recibidos
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl">{user.username}</h1>
        <img src={user.image.url} alt="profile-picture" className="w-32 auto" />
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <NavLink to={`/items/${item._id}`}>
            <div
              key={item.id}
              className="flex flex-col justify-between bg-gray-300 shadow-md bg-opacity-80 p-3 rounded-lg h-full w-64"
            >
              <div>
                <img
                  src={item.images[0].url}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h3 className="text-xl text-black border-black">
                  {item.title}
                </h3>
              </div>
              <p className="bg-white rounded-b-lg p-2 mt-2">
                {item.location.city}, {item.location.street},{" "}
                {item.location.houseNumber}
              </p>
            </div>
          </NavLink>
        ))}
          </div>
          
    </div>
  );
}

export default NotYourProfile;
