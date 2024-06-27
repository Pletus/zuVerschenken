/* import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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
 */
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Static method to sign up a new user
userSchema.statics.signup = async function (username, password, email) {
  try {
    // Check if username or email already exists
    const existingUser = await this.findOne().or([{ username }, { email }]);
    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and return the new user
    const newUser = await this.create({
      username,
      password: hashedPassword,
      email,
    });

    return newUser;
  } catch (error) {
    throw error; // Propagate the error to handle it further up in the call stack
  }
};

// Static method to log in a user
userSchema.statics.login = async function (username, password) {
  try {
    // Check if username exists
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error("Incorrect username");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    return user; // Return the user object if login successful
  } catch (error) {
    throw error; // Propagate the error to handle it further up in the call stack
  }
};

const Users = mongoose.model("Users", userSchema);

export default Users;
