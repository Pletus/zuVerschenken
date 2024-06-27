import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function Profile() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [fileName, setFileName] = useState('change your profile picture');

  const handleChangePasswordClick = () => {
    setIsChangePasswordVisible(!isChangePasswordVisible);
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

      setMessage(response.data.msg);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password");
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

    function decodeToken(token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    }

    const decoded = decodeToken(token);
    const userId = decoded.id;

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

      setMessage("Image uploaded");
      fetchImageUrl(userId, token); // Fetch the updated image URL after uploading
      window.location.reload();
    } catch (error) {
      console.error("Error uploading the image:", error);
      setMessage("Error uploading the image");
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
    <section className="flex justify-center min-w-min min-h-screen p-6 md:p-20">
      <div className="responsiveDiv shadow-2xl bg-blue-400 bg-opacity-20 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-center">
        <div className="flex flex-col items-center justify-center">
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
            <button
              type="submit"
              className="flex justify-center items-center bg-blue-700 rounded-full text-white p-2 mt-2"
            >
              Submit
            </button>
          </form>
          <div>
            {isChangePasswordVisible ? (
              <form onSubmit={handleChangePassword}>
                <label>
                  Current Password:
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </label>
                <label>
                  New Password:
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </label>
                <button
                  className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
                  type="submit"
                >
                  Change Password
                </button>
                <button
                  onClick={handleChangePasswordClick}
                  className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
                >
                  X
                </button>
              </form>
            ) : (
              <button
                onClick={handleChangePasswordClick}
                className="flex justify-center items-center bg-blue-500 rounded-full text-white p-2 mt-2"
              >
                change password
              </button>
            )}
            {message && <p>{message}</p>}
          </div>
        </div>
        <div className="flex items-center justify-center">Items Posted</div>
        <div className="flex items-center justify-center">Wishlist</div>
        <div className="flex items-center justify-center">Ranking</div>
      </div>
    </section>
  );
}

export default Profile;
