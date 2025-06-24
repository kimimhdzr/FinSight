const Goal = require("../models/Goals");

exports.createGoal = async (req, res) => {
  try {
    const {
      goalName = "",
      startDate = new Date(),
      endDate = new Date(),
      desc = "",
      goalPicUrl = "",
      savedAmount = 0,
      goalAmount = 0,
      completion = false,
    } = req.body;

    const goal = await Goal.create({
      user_ID: req.user.id,
      goalName,
      startDate,
      endDate,
      desc,
      goalPicUrl,
      savedAmount,
      goalAmount,
      completion,
    });

    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGoalsByUser = async (req, res) => {
  try {
    const goals = await Goal.find({ user_ID: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.goalId, user_ID: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedGoal)
      return res.status(404).json({ message: "Goal not found" });
    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({
      _id: req.params.goalId,
      user_ID: req.user.id,
    });
    if (!deletedGoal)
      return res.status(404).json({ message: "Goal not found" });
    res.json({ message: "Goal deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
