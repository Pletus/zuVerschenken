import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();


app.listen(8080, () => {
    console.log(`server is listening on port 8080`);
  });
