const User = require('../models/User');

exports.editProfile = async (req, res) => {
  const userId = req.user.id; // comes from JWT middleware
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  res.json(updatedUser);
};
