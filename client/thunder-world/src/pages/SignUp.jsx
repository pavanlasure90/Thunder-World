import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/signup', {
        name,
        email,
        password,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setName('');
        setEmail('');
        setPassword('');
        toast.success(`Signup Successful. Welcome, ${name}!`);
        navigate('/');
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      toast.error('This email already exists...');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundImage: 'linear-gradient(to right, #3c0f52, #3c0f52)', height: '100vh' }}>
      <div className="col-md-6 mt-7 mx-auto my-auto" style={{ background: 'linear-gradient(to left, #ff6666, #ffcc00)', padding: '20px', borderRadius: '8px' }}>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to='/'><button className="btn btn-primary" style={{marginLeft: '22px'}}>Login</button></Link>
          <button type="submit" className="btn btn-success" style={{marginLeft: '22px'}}>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
