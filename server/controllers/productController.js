// productControllers.js
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  try {
    // Extract product data from the request body
    const { title, image, description } = req.body;

    // Create a new product document
    const newProduct = new Product({
      title,
      image,
      description
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json({ message: 'Product added to cart successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

module.exports = {
  addToCart
};
