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
  const userId = req.params.id;
  const { url, filename, size } = req.body;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newImage = {
      url,
      filename,
      size
    };

    user.image.push(newImage);

    user = await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error on the server');
  }
};

export { loginUser, signupUser, updateUserImage };
