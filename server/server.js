const express = require("express");
require('dotenv').config();
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
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  mongoose.connect("mongodb://localhost:27017/chatapp", {});
  console.log("mongodb running");
} catch (error) {
  console.error(error);
}
app.use((req, res, next) =>{
  req.io = io;
  next()
})

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
