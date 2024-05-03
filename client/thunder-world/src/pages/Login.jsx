import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', {
                email,
                password,
            });
            localStorage.setItem('userInfo', response.data._id.toString())
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                // Reset form fields
                setEmail('');
                setPassword('');
                toast.success(`Login Successful. Welcome ${email.split('@')[0]} !`);
                navigate('/home');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundImage: 'linear-gradient(to right, #3c0f52, #3c0f52)', height: '100vh' }}>
            <div className="col-md-6 mt-5 mx-auto my-1" style={{ background: 'linear-gradient(to left, #ff6666, #ffcc00)', padding: '20px', borderRadius: '8px' }}>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p className="mt-3 text-light">
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
