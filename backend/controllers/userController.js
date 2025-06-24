const UserProfile = require("../models/UserProfile");

exports.createUser = async (req, res) => {
  try {
    const user = await UserProfile.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user.id).select(
      "-passwordHash"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/userController.js
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await UserProfile.findByIdAndUpdate(
      req.user.id, // Extracted from JWT
      req.body, // Update with body data
      { new: true, select: "-passwordHash" } // Return updated data, exclude password
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndDelete(req.user.id).select(
      "-passwordHash"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
