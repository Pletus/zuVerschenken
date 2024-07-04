import express from 'express';
import {getComments, addComment} from '../controllers/comment.js';
import requireAuth from '../requireAuth.js';



const commentRouter = express.Router();


commentRouter.get('/:itemId/comments', getComments);
commentRouter.post('/:itemId/comments',requireAuth, addComment);

export default commentRouter
