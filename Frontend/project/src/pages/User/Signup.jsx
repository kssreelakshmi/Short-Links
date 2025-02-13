import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signup from '../../assets/signup.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";


const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'http://localhost:8000';

  const formValidation = () => {
    let tempErrors = {};
    if (!values.username.trim()) {
      tempErrors.username = 'Username is required';
    }

    if (!values.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (!values.phoneNumber) {
      tempErrors.phoneNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(values.phoneNumber)) {
      tempErrors.phoneNumber = 'Mobile number is invalid';
    }

    if (!values.password) {
      tempErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(values.password)) {
      tempErrors.password = 'Password must be at least 6 characters, including uppercase, lowercase, numbers, and special characters.';
    }

    if (!values.confirmPassword) {
      tempErrors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValidation()) return;

    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('phone_number', values.phoneNumber);
    formData.append('password', values.password);

    try {
      const response = await axios.post(`${baseURL}/api/user/signup/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate('/login', { state: response.data.Message });
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 406) {
          setErrors(error.response.data);
          toast.error(error.response.data.error || "Invalid input data");
        } else {
          toast.error("Server error. Please try again later.");
        }
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 p-6'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className='w-full max-w-4xl bg-white p-8 shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 '>
        <div className='flex items-center justify-center'>
          <img src={signup} alt="Signup" className='max-w-full h-auto object-cover rounded-lg' />
        </div>

        <div className='flex flex-col justify-center'>
          <h1 className='text-center mb-4 text-3xl font-serif'>Sign Up</h1>
          <p className='text-center mb-6 text-gray-600'>
            Join us today! Create an account to get started.
          </p>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className='block mb-1 text-gray-700'>Username</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Enter your username" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className='block mb-1 text-gray-700'>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className='block mb-1 text-gray-700'>Mobile Number</label>
              <input 
                type="text" 
                id="phoneNumber" 
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your mobile number" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label htmlFor="password" className='block mb-1 text-gray-700'>Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 m-1"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className='block mb-1 text-gray-700'>Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={values.confirmPassword}  
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 m-1"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
                  
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            <button type='submit' className='w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200'>
              Sign Up
            </button>

            <p className="text-center text-gray-600 mt-4">
              Already have an account? 
              <Link to="/login" className="text-indigo-500 font-semibold ml-1 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
