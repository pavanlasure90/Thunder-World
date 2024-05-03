// productRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/productController');

router.post('/add-to-cart', addToCart);

module.exports = router;
