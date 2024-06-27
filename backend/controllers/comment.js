/* import Comment from "../schemas/comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments", err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addComment = async (req, res) => {
  const { itemId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text field is required' });
  }

  try {
    const newComment = new Comment({
      itemId,
      text,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error saving comment", err);
    res.status(500).json({ error: 'Server error' });
  }
};
 */
// controllers/comment.js

/* import Comment from "../schemas/comment.js";



export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId }).populate('userId', 'username');
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments", err);
    res.status(500).json({ error: 'Server error' });
  }
};


export const addComment = async (req, res) => {
    const { itemId } = req.params;
    const { text } = req.body;
    const userId = req.user._id; // Assuming you have user information in req.user
  
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' });
    }
  
    try {
      const newComment = new Comment({
        itemId,
        userId,
        text,
      });
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      console.error("Error saving comment", err);
      res.status(500).json({ error: 'Server error' });
    }
  };
 */
// controllers/comment.js

/* import Comment from "../schemas/comment.js";
import Item from "../schemas/items.js";

export const getComments = async (req, res) => {
    const { itemId } = req.params;
    try {
      const comments = await Comment.find({ itemId: itemId })
        .populate('userId','username')
        .exec();
      res.status(200).json(comments);
    } catch (err) {
      console.error('Error fetching comments', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const addComment = async (req, res) => {
  const { itemId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have user information in req.user

  if (!text) {
    return res.status(400).json({ error: 'Text field is required' });
  }

  try {
    const newComment = new Comment({
      itemId,
      userId,
      text,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error saving comment", err);
    res.status(500).json({ error: 'Server error' });
  }
};
 */

import Comment from "../schemas/comment.js";
import Item from "../schemas/items.js";

export const getComments = async (req, res) => {
  const { itemId } = req.params;
  try {
    const comments = await Comment.find({ itemId: itemId })
      .populate('userId', 'username')
      .exec();
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addComment = async (req, res) => {
  const { itemId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have user information in req.user

  if (!text) {
    return res.status(400).json({ error: 'Text field is required' });
  }

  try {
    const newComment = new Comment({
      itemId,
      userId,
      text,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error saving comment", err);
    res.status(500).json({ error: 'Server error' });
  }
};
