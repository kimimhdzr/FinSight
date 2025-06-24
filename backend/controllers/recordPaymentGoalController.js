const RecordPaymentGoal = require("../models/RecordPaymentGoals");

// Create a payment for a goal
exports.addPayment = async (req, res) => {
  try {
    const { goal_ID, amount, date, desc } = req.body;

    const payment = await RecordPaymentGoal.create({
      goal_ID,
      amount,
      date,
      desc,
    });

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all payments by goal ID
exports.getPaymentsByGoal = async (req, res) => {
  try {
    const goal_ID = req.params.goalId;
    const payments = await RecordPaymentGoal.find({ goal_ID });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    const updated = await RecordPaymentGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const deleted = await RecordPaymentGoal.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
