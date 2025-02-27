import React from 'react';
import { FaEdit } from "react-icons/fa";

const UserInfo = () => {
  return (
    <div className="p-10 mx-10 flex">
      
      {/* Left: User Details */}
      <div className="w-2/3 flex flex-col space-y-6">
        <h1 className="text-2xl font-mono font-semibold text-gray-700">User Info</h1>

        {["Username", "Mobile Number", "Email", "Address","Password"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600">{field}</label>
            <input type="text" className="bg-white border border-gray-300 shadow-md w-3/4 h-11 px-3 rounded-xl focus:outline-blue-400" />
            
          </div>
        ))}
        <div className=' flex flex-row space-x-8 justify-'> 
        <button className='bg-black/60 text-white h-10 w-20 '>Edit</button>
        <button className='bg-teal-500 text-white h-10 w-20'>Save</button>

        </div>
      </div>

      {/* Right: Profile Picture */}
      <div className="w-1/3 flex flex-col items-center ">
        <div className='bg-white w-[410px] h-[410px] rounded-lg shadow-lg flex items-center justify-center'>

        <img 
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
          alt="Profile" 
          className="size-96 rounded-lg shadow-md" 
        />
        </div>
        <button className="mt-4 bg-blue-500 text-white h-10 w-44 rounded-lg hover:bg-blue-600 transition">
          Change Profile Picture
        </button>
      </div>

    </div>
  );
};

export default UserInfo;
