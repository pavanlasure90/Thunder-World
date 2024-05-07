const Product = require("../models/Product");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

const addToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const { id, title, image, description, price } = req.body;
    const cartItemId = uuidv4();
    const user = await User.findById(id);
    user.cart.push({ _id: cartItemId, title, image, description, price }); // Use push to add the product to cart
    await user.save();

    res.status(201).json({
      message: "Product added to cart successfully",
      product: user,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCartDetails = async (req, res) => {
  try {
    // Extract product data from the request body
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      message: "Cart details retrieved successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error retrieving cart details:", error);
    res.status(500).json({ error: error.message });
  }
};

// productControllers.js
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    console.log(userId)
    const user = await User.findById(userId);

    // Remove the product from the user's cart
    user.cart = user.cart.filter((item) => item._id !== productId);
    await user.save();
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addToCart,
  getCartDetails,
  removeFromCart,
};
