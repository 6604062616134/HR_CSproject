const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authenticateToken');

router.get('/login', authenticateToken, UserController.login);
router.get('/logout', authenticateToken, UserController.logout);

router.post('/createUser', UserController.createUser);

module.exports = router;