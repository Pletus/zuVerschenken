import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  filename: String,
  size: Number
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: [ImageSchema],
});

userSchema.statics.signup = async function (username, password, email) {
  const usernameExists = await this.findOne({ username });

  if (usernameExists) throw Error("Username already in use");

  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hashedPW, email });

  return user;
};

userSchema.statics.login = async function (username, password) {
    if (!username || !password) throw Error('Please provide your credentials');

    const user = await this.findOne({ username }).lean();

    if (!user) throw Error('Incorrect username');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error('Incorrect password');
    
    return user;
}

export default mongoose.model('Users', userSchema);

