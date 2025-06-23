const RecordPaymentGoal = require('../models/RecordPaymentGoals');

exports.addPayment = async (req, res) => {
  try {
    const payment = await RecordPaymentGoal.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaymentsByGoal = async (req, res) => {
  try {
    const payments = await RecordPaymentGoal.find({ goal_ID: req.params.goalId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
