import cloudinary from 'cloudinary'
import User from "../schemas/users.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

const signupUser = async function (req, res) {
  const { username, password, email } = req.body;

  try {
    const user = await User.signup(username, password, email);
    const token = createToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserImage = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const newImage = {
      url: result.secure_url,
      filename: result.public_id,
      size: req.file.size,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { image: newImage } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ user, image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const getUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const imageUrl = user.image[0].url; 

    res.json({ image: { url: imageUrl } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export { loginUser, signupUser, updateUserImage, getUserImage };
