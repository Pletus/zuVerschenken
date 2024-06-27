import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.statics.signup = async function (username, password, email) {
  try {
    
    const existingUser = await this.findOne().or([{ username }, { email }]);
    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await this.create({
      username,
      password: hashedPassword,
      email,
    });

    return newUser;
  } catch (error) {
    throw error; 
  }
};

userSchema.statics.login = async function (username, password) {
  try {
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error("Incorrect username");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user; 
  } catch (error) {
    throw error; 
  }
};

const Users = mongoose.model("Users", userSchema);

export default Users;
