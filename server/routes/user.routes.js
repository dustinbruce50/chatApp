const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if username is free
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "username already taken" });
    }

    //salts the pw for comparison to db password
    const hashpw = await bcrypt.hash(password, 10);

    
    //creat use with username and hashed password
    const user = new User({ username, password: hashpw });
    console.log("new user created");
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("TEST Error: ", error);
    res.status(500).json({ message: "server error", error });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {

    //check username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "invalid username" });
    }

    //check password
    const pwValid = await bcrypt.compare(password, user.password);
    if (!pwValid) {
      return res.status(400).json({ error: "invalid password" });
    }

    //else, create jwt and attach to response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("User successfully logged in");
    res.json({ token });
    
  } catch (error) {
    console.log("POST Error: ", error)
    res.status(500).json({ error: error?.message });
  }
});

module.exports = router;
