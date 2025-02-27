import React from 'react'
import {Link} from 'react-router-dom'
import UserInfo from '../../components/User/profile/userInfo'

const Profile = () => {
  return (
    <>
  <section className='max-w-full h-screen bg-gray-100 '>
    <div className='ml-20 flex flex-row'>
    <div className="w-1/5 h-3/4 bg-slate-200 mt-36 mr-10  border-1 rounded-2xl shadow-2xl">
    <div className='flex flex-col text-center font-mono text-xl m-3  '>
      <p className='text-2xl bg-slate-400 font-mono text-black'>Profile</p>
      <Link className='my-3'>User Info</Link>
      <Link className='my-3'>All Links</Link>
      <Link className='my-3'>Link Analysis</Link>
      <Link className='my-3'>Plans and Subscription</Link>
    </div>
    </div>
    <div className='w-4/5 h-full bg-gray-200 rounded-lg shadow-lg mt-36 mr-10'>
    <UserInfo />
    </div>
    </div>
  </section>
    </>
  )
}

export default Profile