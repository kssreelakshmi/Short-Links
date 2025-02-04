import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from '../../pages/User/Home';
import Navbar from './Navbar';
import Footer from './Footer'
import Signup from '../../pages/User/Signup';
import Login from '../../pages/User/Login';
import Profile from '../../pages/User/Profile';
import Url from '../../pages/User/Url';

const UserWrapper = () => {
  return (
    <div className='bg-black '>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/url" element={<Url />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
    <Footer />    
    </div>
  )
}

export default UserWrapper