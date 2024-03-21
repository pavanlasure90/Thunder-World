// productRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/productControllers');

router.post('/add-to-cart', addToCart);

module.exports = router;
