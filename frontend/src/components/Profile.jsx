import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function Profile() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [isChangePictureVisible, setIsChangePictureVisible] = useState(false);
  const [fileName, setFileName] = useState("change your profile picture");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 2;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < filteredItems.length
        ? prevIndex + itemsPerPage
        : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0
        ? prevIndex - itemsPerPage
        : Math.max(filteredItems.length - itemsPerPage, 0)
    );
  };

  const currentItems = filteredItems.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

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
  }, [userId]);

  useEffect(() => {
    const filtered = items.filter((item) => item.postedBy._id === userId);
    setFilteredItems(filtered);
  }, [items, userId]);

  const addCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  const navigate = useNavigate();

  const handleChangePasswordClick = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
  };

  const handleChangePictureClick = () => {
    setIsChangePictureVisible(!isChangePictureVisible);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Token not found");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/users/change-password",
        {
          userId: `${userId}`,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password changed", {
        onClose: () => {
          window.location.reload();
        },
      });
      setMessage(response.data.msg);
      setIsChangePasswordVisible(false);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password");
      toast("Wrong username or password");
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Token not found");
      return;
    }

    if (!userId) {
      setMessage("User ID not found in token");
      return;
    }

    const formData = new FormData();
    formData.append("image", images[0]);

    try {
      await axios.put(`http://localhost:8080/users/${userId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsChangePictureVisible(false);
      setMessage("Image uploaded");
      fetchImageUrl(userId, token);
      toast.success("Image uploaded", {
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error uploading the image:", error);
      setMessage("Error uploading the image");
      toast("Error uploading the image");
    }
  };

  const fetchImageUrl = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}/image`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImageUrl(response.data.image.url);
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      function decodeToken(token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
      }

      const decoded = decodeToken(token);
      const userId = decoded.id;
      setUserId(userId);
      if (userId) {
        fetchImageUrl(userId, token);
      }
    }
  }, []);

  return (
    <section className="flex justify-center min-w-min min-h-screen p-6 md:p-12">
      <div className="responsiveDiv p-4 shadow-2xl bg-blue-400 bg-opacity-20 rounded-lg text-center">
        <div className="flex flex-col gap-4 items-center justify-center p-6 mb-8 mt-6 md:mb-0 md:mt-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="User"
              className="object-cover w-48 h-48 rounded-full border-2 border-blue-500 shadow-md"
            />
          ) : (
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="object-cover w-48 h-48 rounded-full border-2 border-blue-500 shadow-md"
            />
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="file"
              onClick={handleChangePictureClick}
              name="profileImage"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            <label
              htmlFor="fileInput"
              className="flex justify-center items-center bg-blue-500 text-white rounded-full p-2 cursor-pointer"
            >
              {fileName}
            </label>
            {isChangePictureVisible ? (
              <button
                type="submit"
                className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
              >
                Submit
              </button>
            ) : null}
          </form>
          <div>
            {isChangePasswordVisible ? (
              <form
                onSubmit={handleChangePassword}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <div className="flex flex-row gap-2">
                  <button
                    className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
                    type="submit"
                  >
                    change your password
                  </button>
                  <button
                    onClick={handleChangePasswordClick}
                    className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
                  >
                    X
                  </button>
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  placeholder="password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pl-2 text-center text-white rounded-full bg-blue-500 bg-opacity-0 border-2 border-blue-400 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                />
                <input
                  type="password"
                  value={newPassword}
                  placeholder="new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="pl-2 text-center rounded-full bg-blue-500 bg-opacity-0 border-2 border-blue-400 text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                />
              </form>
            ) : (
              <button
                onClick={handleChangePasswordClick}
                className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
              >
                change your password
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center my-2 mx-2 md:my-12 lg:mx-12">
          <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 bg-opacity-60 w-full">
            <h2 className="p-4 text-2xl">Items Posted</h2>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
              {currentItems.map((item) => (
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
            <div className="flex justify-center gap-2 mt-4 w-full">
              {currentIndex === 0 ? null : (
                <button
                  onClick={handlePrev}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  &lt;
                </button>
              )}
              {currentIndex + itemsPerPage < filteredItems.length && (
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white p-2 rounded-full mx-2"
                >
                  &gt;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Profile;
