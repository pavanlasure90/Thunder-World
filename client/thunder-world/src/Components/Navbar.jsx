import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-1">
      <Link className="navbar-brand" to="/home">
        <i style={{color: '#211666', fontWeight:"bold", marginLeft:"1rem"}}>Thunder World</i>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => {
          document.getElementById("navbarNav").classList.toggle("show");
        }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">

            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
            Cart
            </Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Logout
            </Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



