import cloudinary from 'cloudinary'
import User from "../schemas/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    const file = req.file;

    if (!file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const result = await cloudinary.v2.uploader.upload(file.path);

    const newImage = {
      url: result.secure_url,
      filename: result.public_id,
      size: file.size,
    };

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.image.length > 0) {
      await cloudinary.v2.uploader.destroy(user.image[0].filename);
    }

    user.image = [newImage];
    await user.save();

    res.json({ msg: 'Image updated successfully', image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

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

const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export { loginUser, signupUser, updateUserImage, getUserImage, changePassword };
