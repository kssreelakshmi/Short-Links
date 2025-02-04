import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/fav_icon.png';
import defaultImage from '../../assets/pro_pic.svg';


const Navbar = () => {
  return (
    <>
      <div className='fixed z-50 top-4 left-0 w-full'>
        <div className='bg-white h-20 mx-4 md:mx-10 rounded-2xl shadow-xl py-2'> 
          <div className='flex justify-between items-center h-16 text-black px-4 md:px-8'>
            
            <div className='flex items-center'>
              <Link to='/'>
                <img src={Icon} alt="Logo" className='h-12 sm:h-16 w-32 sm:w-40 hover:animate-pulse p-2'/>
              </Link>
            </div>

            
            <div className='text-lg flex items-center space-x-4 sm:space-x-10 lg:space-x-32 mx-4 sm:mx-10 md:mx-20'>
              <Link to='/' >Home</Link>  
              <Link to='/url'>Services</Link>
              <Link to='/login'>Login</Link> 
              <Link to='/signup'>Signup</Link> 
              <label className="grid cursor-pointer place-items-center">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1" />
              <svg
                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              </label>
              <Link to='/profile'>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                    <p className='font-mono text-center my-3 mx-1'>Sreekutty</p>
                </div>
                {/* <img src={defaultImage} alt="Profile" className='w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] rounded-full border border-gray-300'/> */}
              </Link> 
            </div>
          </div>
        </div>
      </div>

      <div className='mt-24'></div>
    </>
  );
};

export default Navbar;
