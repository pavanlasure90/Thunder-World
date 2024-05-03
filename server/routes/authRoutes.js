// Import necessary modules
const express = require('express');
const router = express.Router();
const { test, handleSignup , handleLogin, getProfile } = require('../controllers/authControllers');

// Enable CORS for all routes


// Define routes
router.get('/', test);
router.post('/signup', handleSignup);
router.post('/login' , handleLogin)
router.get('/profile', getProfile)

// Export the router
module.exports = router;
