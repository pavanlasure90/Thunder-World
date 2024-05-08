import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Cart from './pages/Cart';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../../context/userContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import StripePay from './pages/StripePay';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <div>
        <Toaster position='bottom-right' toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/stripe' element={<StripePay />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
};

export default App;
