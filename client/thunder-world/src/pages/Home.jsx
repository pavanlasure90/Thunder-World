import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        const initialProducts = data.map((product) => ({
          title: product.title,
          image: product.image,
          description: product.description,
          showFullDescription: false,
        }));
        setOriginalProducts(initialProducts);
        setProducts(initialProducts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleSearch = (query) => {
    const filteredProducts = originalProducts.filter(
      (product) => product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleAddToCart = async (product) => {
    try {
      console.log(product);
      const id = localStorage.getItem('userInfo')
      const response = await axios.post('http://localhost:8000/product/add-to-cart', { ...product, id });
      console.log('Response from server:', response);
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  return (
    <>
      <Navbar />
      <div className="container my-3">
        <form className="form-inline my-2 my-lg-0">
          <input
            style={{ width: "100vw" }}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <img src={product.image} className="card-img-top" alt="" />
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-text">
                    {product.showFullDescription
                      ? product.description
                      : `${product.description.slice(0, 80)}...`}
                    <span
                      className="read-more-link"
                      onClick={() => {
                        const updatedProducts = products.map((p, i) => {
                          if (i === index) {
                            return {
                              ...p,
                              showFullDescription: !p.showFullDescription,
                            };
                          }
                          return p;
                        });
                        setProducts(updatedProducts);
                      }}
                    >
                      {product.showFullDescription ? 'Read less' : 'Read more'}
                    </span>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary" onClick={() => handleAddToCart(product)}>Add to cart</button>
                    <button className="btn btn-primary">Buy now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
