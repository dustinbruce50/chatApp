const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  try {
    const token = authHeader.replace("Bearer ", " ").trim();
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log("Authenticate error:", error);
    res.status(400).json({ error: "invalid token" });
  }
};

router.post("/", authenticate, async (req, res) => {
  const { content } = req.body;
  const user = await User.findById(req.user.userId, 'username');
  try {
    const message = new Message({ sender: user, content });
    
    await message.save();
    req.io.emit("receiveMessage", message);
    console.log("server emit")
    res.status(201).json({ message });
  } catch (error) {
    console.log("message post error: ", error);
    
    res.status(400).json({ error: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "username")
      .sort({ timestamp: 1 });
    res.json({ messages });
  } catch (error) {
    console.log("inside get api error:", error);
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
