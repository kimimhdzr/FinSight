
const Goal = require("../models/Goals");

exports.createGoal = async (req, res) => {
  try {
    const goal = await Goal.create(req.body);
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGoalsByUser = async (req, res) => {
  try {
    const goals = await Goal.find({ user_ID: req.params.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
