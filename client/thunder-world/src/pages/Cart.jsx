import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userInfo');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/get-cart/${userId}`);
        setCartData(response.data.cart);
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
      setCartData(cartData.filter(item => item._id !== productId)); // Use _id for comparison
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
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
        <h2>Cart</h2>
        {cartData.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <div className="row">
            {cartData.map((item, index) => (
              <div key={index} className="col-md-3 mb-3">
                <img src={item.image} className="img-fluid" alt={item.title} />
                <div>
                  <h5>{item.title}</h5>
                  {item.price && <p>Price: {item.price}</p>}
                  {item.description && <p>{item.description}</p>}
                  {item._id && <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>} 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
