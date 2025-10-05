const express = require("express");
require("dotenv").config();
const User = require("./models/user.model");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/chatapp";
const bcrypt = require("bcrypt");
const port = 4242;

const SEED_USER = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

//routes
const userRoutes = require("./routes/user.routes");
const messageRoutes = require("./routes/message.routes");
const Message = require("./models/message.model");

//middleware
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection with retry logic
(async () => {
  try {
    await mongoose.connect(mongoURI, {});
    //throw new Error("Simulated connection error"); // Simulating an error for testing
    console.log("MongoDB connected");
  } catch (error1) {
    console.error(error1);
    console.log(
      "Mongo DB did not connect, trying to connect to Docker container"
    );
    retries = 5;
    for (let i = 0; i < retries; i++) {
      try {
        await mongoose.connect("mongodb://mongo:27017/chatapp", {});
        console.log("MongoDB connected in Docker container");
        break;
      } catch (error2) {
        console.error("MongoDB connection failed in Docker container", error2);
      }

      if (i < retries - 1) {
        console.log(`Retrying connection (${i + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); 
      } else {
        console.error("Failed to connect to MongoDB after multiple attempts.");
        process.exit(1); 
      }
    }
  }
  //Seeding DB with test user
  try{
        await User.deleteMany({});
        await Message.deleteMany({});
        console.log("Cleared existing users and messages");

        for (const u of SEED_USER) {
            const hash = await bcrypt.hash(u.password, 10);
            const created = await User.create({ username: u.username, password: hash });
            console.log("Created Test Users + Password:", u.username, u.password);
        }

        console.log("Seeding completed");
    }
    catch(err){
        console.error("Error occurred while seeding:", err);
        process.exit(1);
    }
})();


const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: true, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {

});


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(port, "0.0.0.0");
