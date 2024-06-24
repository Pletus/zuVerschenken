import express from 'express';
import { loginUser, signupUser } from '../controllers/users.js';
import requireAuth from '../requireAuth.js';
const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', requireAuth, (req, res) => res.send('Hello on the protected route!'));

export default userRouter;
