const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/recordPaymentGoalController');
const authMiddleware = require('../middleware/authMiddleware');

// All require JWT
router.post('/payment', authMiddleware, paymentController.addPayment);
router.get('/payment/:goalId', authMiddleware, paymentController.getPaymentsByGoal);
router.put('/payment/:id', authMiddleware, paymentController.updatePayment);
router.delete('/payment/:id', authMiddleware, paymentController.deletePayment);

module.exports = router;
