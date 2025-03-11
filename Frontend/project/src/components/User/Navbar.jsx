import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, Slide, Zoom, toast } from 'react-toastify';
import Icon from '../../assets/fav_icon.png';
import Theme from './Theme';
import { set_user_authentication } from '../../redux/user/UserSlice';


const Navbar = () => {
  const user_authentication = useSelector((state)=> state.user_authentication)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    dispatch(
      set_user_authentication({
        name: null,
        isAuthenticated: false,
      })
    );
    navigate("/login");
    
    toast.info("Logged out !", {
      position: "top-center",
      autoClose: 1999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

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
              <button>
              <Link to='/' >Home</Link>  
              </button>

              <button>
              <Link to='/url'>Services</Link>
              </button>
              
              { !user_authentication.isAuthenticated ? 
              <>
              <button>
              <Link to='/login'>Login</Link> 
              </button>

              <button>
              <Link to='/signup'>Signup</Link> 
              </button>
              </>
              :
              <>
              <button onClick={()=>logout()}>Logout</button>
              </>

              }

              <Theme />
              <button>
              <Link to='/profile'>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={ user_authentication.isAuthenticated ?
                      user_authentication.profile_pic : 
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                      alt='Profile Picture' />
                  </div>
                    <p className='font-mono text-center my-3 mx-1'>{user_authentication.isAuthenticated ?user_authentication.name:'Guest User'}</p>
                </div>
              </Link> 

              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
