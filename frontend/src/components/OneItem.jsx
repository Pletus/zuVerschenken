import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import { addComment, fetchComments } from "../commentService";
import wish from "../assets/wish.svg";

const OneItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [user, setUser] = useState(false);

  const getCommentCount = (comments) => {
    if (Array.isArray(comments) && comments.length > 0) {
      return comments.length;
    } else {
      return 0;
    }
  };
console.log(item)
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/items/${id}`
        );
        setItem(response.data);
      } catch (err) {
        console.error("Error fetching item", err);
        setError("Error fetching item");
      } finally {
        setLoading(false);
      }
    };

    const fetchItemComments = async () => {
      try {
        const commentsData = await fetchComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching comments", err);
        setError("Error fetching comments");
      }
    };

    fetchItem();
    fetchItemComments();
  }, [id]);

  

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (isToken) setUser(true);
  }, []);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsInWishlist(wishlist.includes(id));
  }, [id]);

  const handleAddComment = async () => {
    if (!user) {
      alert("You need to be logged in to comment. Please log in or sign up.");
      return;
    } else {
      console.log("Adding comment with text:", commentText);
      try {
        const addedComment = await addComment(id, commentText);
        console.log("Comment added successfully:", addedComment);
        setComments([...comments, addedComment]);
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error);
        setError("Error adding comment");
      }
    }
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleWishlistClick = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((itemId) => itemId !== id);
      setIsInWishlist(false);
    } else {
      wishlist.push(id);
      setIsInWishlist(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleThumbnailClick = (index) => {
    setActiveImg(index);
  };

  const commentCount = getCommentCount(comments);

  return (
    <div className=" bg-sky-100 pb-20">
      <div className="max-w-screen-xl mx-auto p-10 mb-10">
        <div className="flex flex-col justify-center items-center bg-white lg:flex-row gap-16 m-auto lg:items-center shadow-xl shadow-grey-700 p-8">
          <div className="flex flex-col lg:w-1/2">
            {item.images &&
            item.images[activeImg] &&
            item.images[activeImg].url ? (
              <img
                src={item.images[activeImg].url}
                alt={item.title}
                className="w-full h-full aspect-square object-cover mb-4"
              />
            ) : (
              <div className="w-full h-full aspect-square object-cover rounded-xl mb-4 bg-gray-300">
                No Image Available
              </div>
            )}
            <div className="flex flow-row justify-center gap-10 h-24">
              {item.images &&
                item.images
                  .slice(0, 3)
                  .map((image, index) => (
                    <div key={index}>
                      {image.url ? (
                        <img
                          src={image.url}
                          alt={`${item.title} ${index + 1}`}
                          className={`w-24 h-24 rounded-md border-2 gap-2 cursor-pointer ${
                            index === activeImg
                              ? "border-2 border-blue-200"
                              : "border-2 border-grey-100"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-md gap-2 cursor-pointer bg-gray-300">
                          No Image
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-1/2 p-4">
            <div className="flex items-center space-x-2">
              <strong>Wishlist Item</strong>
              <button
                onClick={handleWishlistClick}
                className={`transition-colors duration-200 ${
                  isInWishlist ? "bg-red-500" : "hover:bg-blue-500"
                } p-2 rounded-full`}
              >
                <img
                  src={wish}
                  width={30}
                  height={30}
                  alt="wish icon"
                  className={`transition-colors duration-200 ${
                    isInWishlist ? "filter-red" : ""
                  }`}
                />
              </button>
            </div>
            <h3 className=" font-f font-semibold text-3xl">{item.title}</h3>
            <div><span className="font-f italic text-sm">
                {moment(item.createdAt).format("MMMM D, YYYY")}
              </span> <span><Link to={`/users/${item.postedBy._id}`}>
               |&nbsp; <span className="text-blue-500 font-semibold"
               >{item.postedBy.username}</span>
              </Link></span></div>
            <span className=" position text-grey-700 font-f text-sm text-justify font-normal lg:w-3/4">
              {item.description}
            </span>
            <div>
              <a
                className="text-lg font-semibold text-sm f-font"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${item.location.street} ${item.location.houseNumber}, ${item.location.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >Location: <span className="italic text-blue-500">{item.location.city}, {item.location.street}{" "}
                {item.location.houseNumber}</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white p-6 rounded-lg shadow-xl shadow-grey-700 max-w-screen-md mx-auto">
        <h4
          className="text-xl font-semibold mb-4 cursor-pointer hover:bg-gray-200 pl-2 rounded"
          onClick={toggleCommentsVisibility}
        >
          Comments ({commentCount})
        </h4>
        <div className="mt-6 flex flex-col gap-2">
          <textarea
            className="w-full p-4 border rounded-md"
            rows="1"
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleTextChange}
          />
          <div className="mt-2 text-center text-red-500 text-sm" hidden={user}>
            Please log in to add a comment!
          </div>

          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-full self-end my-2 ${
              !user? "disabled opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddComment}
            disabled={!user}
          >
            Submit
          </button>
        </div>
        {commentsVisible && (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment._id}>
                <div className="bg-gray-100 p-4 rounded-3xl">
                  <p className="font-semibold p-1">
                    {comment.userId?.username || "Anonymous"}{" "}
                  </p>
                  <p>{comment.text}</p>
                </div>
                <div>
                  <p className="pl-4 pt-2 text-sm text-gray-500">
                    {moment(comment.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OneItem;
