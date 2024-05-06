// productRoutes.js
const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartDetails,
} = require("../controllers/productController");

router.post("/add-to-cart", addToCart);
router.get("/get-cart/:id", getCartDetails);

module.exports = router;



