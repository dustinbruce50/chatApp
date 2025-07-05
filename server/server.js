const express = require("express");
require("dotenv").config();
//const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();

const port = 4242;

//routes
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(async () => {
  try {
    //await mongoose.connect("mongodb://localhost:27017/chatapp", {});
    throw new Error("Simulated connection error"); // Simulating an error for testing
    console.log("mongodb running");
  } catch (error1) {
    console.error(error1);
    console.log(
      "MongoDB couldn't connect to localhost, trying Docker container connection"
    );
    retries = 5;
    for (let i = 0; i < retries; i++) {
      try {
        await mongoose.connect("mongodb://mongo:27017/chatapp", {});

        console.log("mongodb running in docker container");
        break;
      } catch (error2) {
        console.error("MongoDB connection failed in Docker container", error2);
      }

      if (i < retries - 1) {
        console.log(`Retrying connection (${i + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        console.error("Failed to connect to MongoDB after multiple attempts.");
        process.exit(1); // Exit the process if connection fails after retries
      }
    }
  }
})();
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port);
