import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/fav_icon.png';
import Theme from './Theme';


const Navbar = () => {
  return (
    <>
      <div className='fixed z-50 top-5 left-0 right-0  w-full'>
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
              <Theme />
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

      {/* <div className='mt-24'></div> */}
    </>
  );
};

export default Navbar;
