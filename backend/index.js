import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import items from "./routes/items.js";
import dotenv from "dotenv";
import configureCloudinary from "./cloudinaryConfig.js";
dotenv.config();

const app = express();

connectDB();
configureCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api/items', items);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
