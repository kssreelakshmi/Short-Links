import React from 'react';
import { Link } from 'react-router-dom';
import signup from '../../assets/signup.jpg';

const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 p-6'>
      <div className='w-full max-w-4xl bg-white p-8 shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6'>

        <div className='flex items-center justify-center'>
          <img src={signup} alt="Signup" className='max-w-full h-auto object-cover rounded-lg' />
        </div>

        <div className='flex flex-col justify-center'>
          <h1 className='text-center mb-4 text-3xl font-serif'>Sign Up</h1>
          <p className='text-center mb-6 text-gray-600'>
            Join us today! Create an account to get started.
          </p>

          <form className='space-y-4'>
            <div>
              <label htmlFor="username" className='block mb-1 text-gray-700'>Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Enter your username" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
            </div>

            <div>
              <label htmlFor="email" className='block mb-1 text-gray-700'>Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
            </div>

            <div>
              <label htmlFor="mobile" className='block mb-1 text-gray-700'>Mobile Number</label>
              <input 
                type="text" 
                id="mobile" 
                placeholder="Enter your mobile number" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
            </div>

            <div>
              <label htmlFor="password" className='block mb-1 text-gray-700'>Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className='block mb-1 text-gray-700'>Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                placeholder="Confirm your password" 
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' 
              />
            </div>

            <button type='submit' className='w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200'>
              Submit
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
  )
}

export default Signup;
