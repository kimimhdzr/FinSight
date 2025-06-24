const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/profile", authMiddleware, userController.createUser);
router.get("/profile", authMiddleware, userController.getUserById);
router.put("/profile", authMiddleware, userController.updateUser);
router.delete("/profile", authMiddleware, userController.deleteUser);

module.exports = router;
