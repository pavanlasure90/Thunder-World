import React from "react";
import { useNavigate } from "react-router-dom";

const CheckedOut = () => {
    let navigate = useNavigate();
    
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient bg-opacity-75" style={{ backgroundImage: 'linear-gradient(to bottom right, #ff8c00, #4b0082)' }}>
            <div className="card p-4 shadow-lg" style={{ maxWidth: '30rem', background: 'linear-gradient(to bottom right, #ff8c00, #76e053)', color: 'white' }}>                
                <div className="card-body">
                    <h2 className="card-title text-center mb-4 animate-bounce">Your Order is Booked!</h2>
                    <p className="card-text text-center mb-4 text-grey">You'll receive further details on your registered number and email.</p>
                    <div className="d-flex justify-content-center">
                        <button 
                            type="button"
                            onClick={() => navigate('/home')} 
                            className="btn btn-outline-primary">
                            Back To Home Page!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckedOut;
