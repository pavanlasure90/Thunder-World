import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/get-cart/${user}`);
        setCartData(response.data.cart);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user]);

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
        <div className="row">
          {cartData.map((item) => (
            <div key={item.id} className="col-md-3 mb-3">
              <div className="card">
                <img src={item.image} className="card-img-top" alt={item.title} style={{ width: '100%', height: 'auto' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-danger">Remove</button> {/* Call handleRemoveFromCart with product ID */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
