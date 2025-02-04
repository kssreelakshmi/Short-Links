import React from 'react'
import {Link} from 'react-router-dom'
import Banner from '../../components/User/Banner.jsx'
import Slider from '../../components/User/slider.jsx'
import Listing from '../../components/User/listing.jsx'
 
const Home = () => {
  return (
    <>
    <div className='relative z-10 top-0'>
      <Banner />
      <div className=' mt-1'>
        <div className=' bg-pink-100 flex'>
          <Slider />
        </div>
        <div className=' bg-gray-100'>
         < Listing />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home