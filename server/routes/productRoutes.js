const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCartDetails,
  removeFromCart,
} = require("../controllers/productController");

router.post("/add-to-cart", addToCart);
router.get("/get-cart/:id", getCartDetails);
router.delete("/remove-from-cart/:userId/:productId", removeFromCart);

module.exports = router;
