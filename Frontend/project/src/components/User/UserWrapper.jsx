import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { set_user_authentication } from '../../redux/user/UserSlice.jsx';
import  isAuthUser  from '../../utils/isAuthUser.jsx'
import UserPrivateRoute from '../UserPrivateRoute.jsx'
import Home from '../../pages/User/Home';
import Navbar from './Navbar';
import Footer from './Footer'
import Signup from '../../pages/User/Signup';
import Login from '../../pages/User/Login';
import Profile from '../../pages/User/Profile';
import Url from '../../pages/User/Url';


const UserWrapper = () => {
  const baseURL = "http://127.0.0.1:8000";
  const user_authentication = useSelector((state)=>state.user_authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuth = async ()=>{
    // console.log('1')
    const isAuthenticated = await isAuthUser();
    // console.log('2')
    console.log(isAuthenticated)
    dispatch(
      set_user_authentication({
        name :isAuthenticated.name,
        isAuthenticated :isAuthenticated.isAuthenticated,
      })
    )
  }

  const fetchUserData = async ()=>{
    try{
      const token = localStorage.getItem('access');
      if(!token) throw new Error('No Access,Token not found');
      const response = await axios.get(`${baseURL}/api/user/details/`,{
        headers : {
          Authorization : `Bearer ${token}`,
          Accept : 'application/json',
          'Content-Type' : 'application/json',
        }
      });
      dispatch(
        set_user_authentication({
          name : response.data.username,
          profile_pic :response.data.profile_pic,
        })
      )
    }
    catch(error){
      console.log("Failed to fetch user data:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        dispatch(
          set_user_authentication({
            name: null,
            isAuthenticated: false,
          }))
        // Handle token expiry (e.g., redirect to login)
        console.log("Token expired or invalid. Redirecting to login.");
      }
    }
  }

  
  useEffect(() => {
    if (!user_authentication.name) {
      // console.log('before auth',user_authentication)
      checkAuth();

      // console.log('4')
    }
    if (user_authentication.isAuthenticated) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_authentication.isAuthenticated]);


  return (
    <div className='bg-black '>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/url" element={<Url />} />
        <Route path="/profile" element=
        {
        <UserPrivateRoute>
        <Profile />
        </UserPrivateRoute>
        } />
    </Routes>
    <Footer />    
    </div>
  )
}

export default UserWrapper