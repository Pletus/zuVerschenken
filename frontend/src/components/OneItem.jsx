/* import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { addComment, fetchComments } from "../commentService";

const OneItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);

  console.log(id);

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

    const fetchItemComments = async () => {
      try {
        const commentsData = await fetchComments(id);
        console.log("Fetched comments:", commentsData);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    if (!comments.length) {
      fetchItemComments();
    }
    fetchItem();
    fetchItemComments();
  }, []);

  const handleAddComment = async () => {
    try {
      const addedComment = await addComment(id, commentText);
      console.log("Comment added successfully:", addedComment);
      setNewComment("");
      setComments([...comments, addedComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

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

    
    <div>
      <div className="max-w-screen-2xl mx-auto bg-slate-100 mt-10">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-16 lg:items-center p-8">
          <div className="flex flex-col lg:w-1/2">
            <img
              src={item.images[activeImg]?.url}
              alt={item.title}
              className="w-full h-full aspect-square object-cover rounded-xl mb-4"
            />
            <div className="flex flow-row justify-center gap-10 h-24">
              {item.images.slice(0, 3).map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={`${item.title} ${index + 1}`}
                    className={`w-24 h-24 rounded-md gap-2 cursor-pointer ${
                      index === activeImg
                        ? "border-2 border-black"
                        : "border-2 border-transparent"
                    }`}
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
        
      </div><div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-screen-lg mx-auto">
          <h4
            className="text-xl font-semibold mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={toggleCommentsVisibility}
          >
            Comments
          </h4>
          <div className="mt-6">
            <textarea
              className="w-full p-4 border rounded-md"
              rows=""
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleTextChange}
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md my-2"
              onClick={handleAddComment}
            >
              Submit
            </button>
          </div>
          {commentsVisible && (
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
                <div key={comment._id}>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="font-bold">{comment.userId?.username}</p>
                    <p>{comment.text}</p>
                  </div>
                  <div>
                    <p className="pl-2 text-sm text-gray-500">
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
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { addComment, fetchComments } from "../commentService";

const OneItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);

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

    const fetchItemComments = async () => {
      try {
        const commentsData = await fetchComments(id);
        console.log("Fetched comments:", commentsData);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    if (!comments.length) {
      fetchItemComments();
    }
    fetchItem();
    fetchItemComments();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const addedComment = await addComment(id, commentText);
      console.log("Comment added successfully:", addedComment);
      setNewComment("");
      setComments([...comments, addedComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
  };

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
    <div>
      <div className="max-w-screen-2xl mx-auto bg-slate-100 mt-10">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-16 lg:items-center p-8">
          <div className="flex flex-col lg:w-1/2">
            <img
              src={item.images[activeImg]?.url}
              alt={item.title}
              className="w-full h-full aspect-square object-cover rounded-xl mb-4"
            />
            <div className="flex flow-row justify-center gap-10 h-24">
              {item.images.slice(0, 3).map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={`${item.title} ${index + 1}`}
                    className={`w-24 h-24 rounded-md gap-2 cursor-pointer ${
                      index === activeImg
                        ? "border-2 border-black"
                        : "border-2 border-transparent"
                    }`}
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
              <p className="mt-2">
                <strong>Posted By:</strong> {item.postedBy.username}
              </p>
            </div>
          </div>
        </div>
        
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-screen-lg mx-auto">
        <h4
          className="text-xl font-semibold mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded"
          onClick={toggleCommentsVisibility}
        >
          Comments
        </h4>
        <div className="mt-6">
          <textarea
            className="w-full p-4 border rounded-md"
            rows=""
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleTextChange}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md my-2"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
        {commentsVisible && (
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment._id}>
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="font-bold">{comment.userId?.username}</p>
                  <p>{comment.text}</p>
                </div>
                <div>
                  <p className="pl-2 text-sm text-gray-500">
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
