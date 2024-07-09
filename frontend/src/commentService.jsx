import axios from 'axios';

const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const addComment = async (itemId, commentText) => {
  try {
    const response = await axios.post(
      `https://zuverschenken.onrender.com/api/items/${itemId}/comments`,
      { text: commentText },
      { headers }
    );
    console.log('Comment added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

const fetchComments = async (itemId) => {
  try {
    const response = await axios.get(`https://zuverschenken.onrender.com/api/items/${itemId}/comments`, /* { headers } */);
    
    const commentsWithUsernames = response.data.map(comment => ({
      ...comment,
      username: comment.users?.username 
    }));
    
    return commentsWithUsernames;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export { addComment, fetchComments };
