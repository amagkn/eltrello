import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const PORT = 3000;
const URL = "mongodb://127.0.0.1:27017/eltrello";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", () => {
  console.log("Socket.io is running");
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");

    httpServer.listen(PORT, () => {
      console.log(`Server is started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
