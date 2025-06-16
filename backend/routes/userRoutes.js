const express = require("express");
const bcrypt = require("bcrypt"); // ✅ add bcrypt
const User = require("../models/User");
const Transactions = require("../models/Transaction");
const router = express.Router();

// -------------------------------
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// Get user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      ...user._doc,
      backgroundPic: user.backgroundPic || "",
      profilePic: user.profilePic || "",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// Update user profile (with bcrypt)
router.put("/:userId", async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;

    // ✅ If password is included, hash it manually
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      otherFields.password = hashedPassword;
    }

    // ✅ Update the whole document properly
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: otherFields },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// Get all transactions (fix: different route to avoid clash with GET /users)
router.get("/transactions/all", async (req, res) => {
  try {
    const transactions = await Transactions.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
