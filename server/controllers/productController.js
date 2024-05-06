// productControllers.js
const Product = require("../models/Product");
const User = require("../models/User");

const addToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const { id, title, image, description, price } = req.body;
    const user = await User.findById(id);
    user.cart.push({ title, image, description, price });
    user.save();

    res.status(201).json({
      message: "Product added to cart successfully",
      product: user,
    });
  } catch (error) {
    console.log();
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: error.message });
  }
};
const getCartDetails = async (req, res) => {
  try {
    // Extract product data from the request body
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(201).json({
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.log();
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartDetails,
};





