const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');   
const { authenticateToken } = require('../middleware/auth.middleware.js');

// Authentication route
router.post('/login', userController.login);

// Protected routes requiring authentication
router.get('/', authenticateToken, userController.getUsers);
router.get('/:username', userController.getUser);
router.post('/', userController.addUser);
router.put('/:username', authenticateToken, userController.updateUser);
router.delete('/:username', authenticateToken, userController.deleteUser);

module.exports = router;