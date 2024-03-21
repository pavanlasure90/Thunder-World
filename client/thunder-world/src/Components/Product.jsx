import React from 'react';
import axios from 'axios';

const Product = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const response = await axios.post('/api/cart/add-to-cart', {
        userId: '', 
        productId: product._id, 
      });

      // Log the response message
      console.log(response.data.message);

    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error message
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <button onClick={handleAddToCart}>Go to Cart</button>
    </div>
  );
};

export default Product;