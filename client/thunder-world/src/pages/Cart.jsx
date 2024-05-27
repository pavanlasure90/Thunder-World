import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import StripePay from './StripePay'; 
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userInfo');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/get-cart/${userId}`);
        setCartData(response.data.cart.map(item => ({ ...item, quantity: 1, totalPrice: item.price }))); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product/remove-from-cart/${userId}/${productId}`);
      // Remove the item from cartData state
      setCartData(cartData.filter(item => item._id !== productId)); 
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCartData(cartData.map(item => {
      if (item._id === productId) {
        const updatedItem = { ...item, quantity: Math.max(1, newQuantity) }; 
        updatedItem.totalPrice = updatedItem.price * updatedItem.quantity; // Calculate total price
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateGrandTotal = () => {
    return cartData.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        {cartData.length === 0 && (
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            No items in the cart
          </p>
        )}
        {cartData.length > 0 && (
          <div className="row">
            {cartData.map((item, index) => (
              <div key={index} className="col-md-3 mb-3">
                {item.image && ( // Conditionally render if item has an image
                  <div className="border p-3">
                    <img src={item.image} className="img-fluid" alt={item.title} />
                    <div>
                      <h5>{item.title}</h5>
                      {item.price && <p>Price: ${item.price}</p>}
                      {item.description && <p>{item.description}</p>}
                      <div className="d-flex align-items-center">
                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} className="btn btn-secondary btn-sm mr-2">-</button>
                        <div>{item.quantity}</div>
                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} className="btn btn-secondary btn-sm ml-2">+</button>
                      </div>
                      <p>Total Price: ${item.quantity === 1 ? item.price : item.totalPrice}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-4 mb-10"> 
          <h2 className="text-2xl font-bold">Grand Total: ${calculateGrandTotal()}</h2>
          <StripePay grandTotal={calculateGrandTotal()} /> 
        </div>
      </div>
    </>
  );
};

export default Cart;
