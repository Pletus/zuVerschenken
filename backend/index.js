import express from "express";
import cors from "cors";
import connectDB from "./connectDB.js";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());



app.listen(8080, () => {
    console.log(`server is listening on port 8080`);
  });
