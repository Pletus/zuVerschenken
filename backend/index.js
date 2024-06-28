import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import userRouter from "./routes/users.js";
import items from "./routes/items.js";
import dotenv from "dotenv";
import configureCloudinary from "./cloudinaryConfig.js";
import commentRouter from "./routes/comment.js";
dotenv.config();


const app = express();

connectDB();
configureCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* const whitelist = process.env.FRONTENDPATH || process.env.LOCALPATH;
app.use(
  cors({
    origin: whitelist,
    optionsSuccessStatus: 200,
  })
); */
app.use(cors())
app.use('/api/items', items);
app.use("/users", userRouter);
app.use('/api/items', commentRouter);

app.listen(8080, () => {
    console.log(`server is listening on port 8080`);
  });
