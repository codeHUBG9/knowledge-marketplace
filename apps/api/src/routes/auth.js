const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

// Registration route
router.post('/register', validateRegistration, register);

// Login route
router.post('/login', validateLogin, login);

module.exports = router;