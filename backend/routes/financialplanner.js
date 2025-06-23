const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const paymentController = require('../controllers/recordPaymentGoal');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, goalController.createGoal);
router.get('/user/:userId', authMiddleware, goalController.getGoalsByUser);

router.post('/', authMiddleware, paymentController.addPayment);
router.get('/goal/:goalId', authMiddleware, paymentController.getPaymentsByGoal);


module.exports = router;
