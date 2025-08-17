const express = require('express');
const { body } = require('express-validator');
const { register, login, getCurrentUser, updateProfile, changePassword } = require('../controllers/authController');
const { validateUserRegistration, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, validate, register);
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required'),
    validate
], login);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;