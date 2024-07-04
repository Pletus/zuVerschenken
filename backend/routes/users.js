import express from 'express';
import { loginUser, signupUser, updateUserImage, getUserImage, changePassword, getUserById } from '../controllers/users.js';
import requireAuth from '../requireAuth.js';
import multer from 'multer';
const userRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', requireAuth, (req, res) => res.send('Hello on the protected route!'));
userRouter.put('/:id/image', upload.single('image'), updateUserImage);
userRouter.get('/:id/image', getUserImage);
userRouter.get('/:id', getUserById);
// userRouter.get('/', getUsers);
userRouter.put('/change-password', changePassword);

export default userRouter;
