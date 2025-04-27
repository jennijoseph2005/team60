const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Login API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
