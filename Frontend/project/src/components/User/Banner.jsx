
// import React from 'react';
// import bgImage from '../../assets/bgImage.jpeg';

// const Banner = () => {
//   return (
//     <>
//       <div className='relative w-screen h-[800px] overflow-hidden'>
//         {/* Background Image */}
//         <img 
//           src={bgImage} 
//           alt="Background"  
//           className='opacity-90 h-full w-full object-cover scale-110 transition-transform duration-[4s] hover:scale-100'
//         />

//         <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-12 lg:px-24 bg-black bg-opacity-40'>
//           <h1 
//             className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in-up'>
//             From Long to Strong in One Click!
//           </h1>
//           <h2 
//             className='text-lg sm:text-2xl lg:text-3xl max-w-3xl drop-shadow-md opacity-0 animate-fade-in delay-500'>
//             Say goodbye to long, messy links. Our URL shortener makes sharing seamless and trackable!
//           </h2>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes fade-in-up {
//             0% { opacity: 0; transform: translateY(20px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in-up {
//             animation: fade-in-up 1.5s ease-out forwards;
//           }

//           @keyframes fade-in {
//             0% { opacity: 0; }
//             100% { opacity: 1; }
//           }
//           .animate-fade-in {
//             animation: fade-in 2s ease-out forwards;
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default Banner;

import React from 'react';
import bgImage from '../../assets/bgImage.jpeg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';

const Banner = () => {
  const carouselImages = [
    { src: img1, caption: "" },
    { src: img2, caption: "" },
    { src: img3, caption: "" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className='relative w-screen h-[800px] overflow-hidden flex'>
        {/* Left Side - Background Image */}
        <div className='w-1/2 relative'>
          <img 
            src={bgImage} 
            alt='Background'  
            className='opacity-90 h-full w-full object-cover scale-110 transition-transform duration-[4s] hover:scale-100'
          />
          <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-12 lg:px-24 bg-black bg-opacity-40'>
            <h1 
              className='text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in-up'>
              From Long to Strong in One Click!
            </h1>
            <h2 
              className='text-lg sm:text-2xl lg:text-3xl max-w-3xl drop-shadow-md opacity-0 animate-fade-in delay-500'>
              Say goodbye to long, messy links. Our URL shortener makes sharing seamless and trackable!
            </h2>
          </div>
        </div>

        <div className='w-1/2 flex items-center justify-center bg-black/65'>
          <Slider {...settings} className='w-[80%]'>
            {carouselImages.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.src} 
                  alt={`Slide ${index + 1}`} 
                  className='w-full h-[600px] rounded-xl shadow-lg object-contain'
                />
                {/* Caption */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-xl">{image.caption}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.5s ease-out forwards;
          }

          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 2s ease-out forwards;
          }
        `}
      </style>
    </>
  );
}

export default Banner;

