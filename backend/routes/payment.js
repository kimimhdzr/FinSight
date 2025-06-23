const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/payments", authMiddleware, paymentController.createPayment);
router.get("/payments", authMiddleware, paymentController.getAllPayments);
router.put("/payments/:id", authMiddleware, paymentController.updatePayment);
router.delete("/payments/:id", authMiddleware, paymentController.deletePayment);

module.exports = router;
