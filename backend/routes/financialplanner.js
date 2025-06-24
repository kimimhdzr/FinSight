const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/goal", authMiddleware, goalController.createGoal);
router.get("/goal", authMiddleware, goalController.getGoalsByUser);
router.put("/goal/:goalId", authMiddleware, goalController.updateGoal);
router.delete("/goal/:goalId", authMiddleware, goalController.deleteGoal);

module.exports = router;
