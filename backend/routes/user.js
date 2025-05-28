const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/edit', authMiddleware, userController.editProfile);

module.exports = router;
