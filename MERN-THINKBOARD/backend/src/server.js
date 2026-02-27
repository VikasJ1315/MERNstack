import express from "express";
import cors from "cors";
import router from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
// const express = require("express");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Requested method is ${req.method} and URL is ${req.url}`);
  next();
});

app.use(rateLimiter);
app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server started!");
  });
});
