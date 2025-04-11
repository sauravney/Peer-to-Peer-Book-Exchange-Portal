import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User (mock password check)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

// Update User Profile
router.put("/:id", async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
