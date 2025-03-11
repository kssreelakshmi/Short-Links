import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_user_authentication } from '../../../redux/user/UserSlice.jsx';

const UserInfo = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    profile_pic: '',
  });

  const user_authentication = useSelector((state) => state.user_authentication);
  const dispatch = useDispatch();
  const baseUrl = "http://127.0.0.1:8000";
  const token = localStorage.getItem("access");

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/user/details`, {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userDetails.username);
    formData.append('email', userDetails.email);
    formData.append('phoneNumber', userDetails.phoneNumber);
    formData.append('address', userDetails.address);
    formData.append('password', userDetails.password);

    try {
      const response = await axios.post(`${baseUrl}/api/user/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setUserDetails((prevData) => ({
          ...prevData,
          profile_pic: response.data.profile_pic,
        }));

        dispatch(
          set_user_authentication({
            name: response.data.username,
            isAuthenticated: true,
          })
        );
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="p-10 mx-10 flex">
      <form onSubmit={handleSubmit} className="w-full flex">
        {/* Left: User Details */}
        <div className="w-2/3 flex flex-col space-y-6">
          <h1 className="text-2xl font-mono font-semibold text-gray-700">User Info</h1>

          {["username", "phoneNumber", "email", "address", "password"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-600 capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={userDetails[field]}
                onChange={handleChange}
                className="bg-white border border-gray-300 shadow-md w-3/4 h-11 px-3 rounded-xl focus:outline-blue-400"
              />
            </div>
          ))}

          {/* Edit & Save Buttons */}
          <div className="flex space-x-6 my-4">
            <button type="button" className="bg-gray-700 text-white h-10 w-20 rounded-lg">Edit</button>
            <button type="submit" className="bg-teal-500 text-white h-10 w-20 rounded-lg">Save</button>
          </div>
        </div>

        {/* Right: Profile Picture */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="bg-white w-[410px] h-[410px] rounded-lg shadow-lg flex items-center justify-center">
            <img
              src={userDetails.profile_pic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="Profile"
              className="w-[390px] h-[390px] rounded-lg shadow-md object-cover"
            />
          </div>
          <button className="mt-4 bg-blue-500 text-white h-10 w-44 rounded-lg hover:bg-blue-600 transition">
            Change Profile Picture
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
