// Import necessary modules
const express = require('express');
const cors = require('cors');
const router = express.Router();
const { test, handleSignup , handleLogin, getProfile } = require('../controllers/authControllers');

// Enable CORS for all routes
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
);

// Define routes
router.get('/', test);
router.post('/signup', handleSignup);
router.post('/login' , handleLogin)
router.get('/profile', getProfile)

// Export the router
module.exports = router;
