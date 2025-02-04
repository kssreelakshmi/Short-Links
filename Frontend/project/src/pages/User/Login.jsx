// import React from 'react';
// import { Link } from 'react-router-dom'; 
// import login from '../../assets/login.jpg';


// const Login = () => {
//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-200 p-10">
//         <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Left Side - Image */}
//           <div className="flex items-center justify-center border rounded-xl">
//             <img src={login} alt="Profile" className=" object-contain" />
//           </div>

//           {/* Right Side - Form */}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-center mb-4 text-3xl font-serif">Login</h1>
//             <p className="text-center mb-6 text-gray-600">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae minima ipsa repellendus at.
//             </p>

//             <form>
//               <div className="mb-5">
//                 <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
//                 <input 
//                   type="email" 
//                   id="email" 
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//                 />
//               </div>

//               <div className="mb-5">
//                 <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
//                 <input 
//                   type="password" 
//                   id="password" 
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//                 />
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React from 'react';
import { Link } from 'react-router-dom'; 
import login from '../../assets/login.jpg';

const Login = () => {
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

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
              <input 
                type="password" 
                id="password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-indigo-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

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
    </div>
  );
};

export default Login;
