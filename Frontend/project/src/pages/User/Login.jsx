import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import login from '../../assets/login.jpg';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { set_user_authentication } from '../../redux/user/userSlice';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!values.email || !values.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/user/login/`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        dispatch(
          set_user_authentication({
            name:jwtDecode(response.data.access).username,
            isAuthenticated : true,
            isAdmin:response.data.isAdmin
          })
        )
        toast.success("Logged in successfully. Redirecting to home...");
        setTimeout(() => {
          navigate('/', { state: response.data.Message });
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 406) {
          toast.error(error.response.data.error || "Invalid input data");
        } else {
          toast.error("Server error. Please try again later.");
        }
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side - Image */}
        <div className="flex items-center justify-center border rounded-xl">
          <img src={login} alt="Login" className="max-w-full h-auto rounded-lg" />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center">
          <h1 className="text-center mb-4 text-3xl font-serif">Login</h1>
          <p className="text-center mb-6 text-gray-600">
            Welcome back! Please enter your credentials to log in.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder='Enter your Email'
                onChange={handleChange}
                value={values.email}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                placeholder='Enter Your Password'
                onChange={handleChange}
                value={values.password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10" 
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 m-3 "
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-indigo-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
            >
              Submit
            </button>

            {/* Signup Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account? 
              <Link to="/signup" className="text-indigo-500 font-semibold ml-1 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
