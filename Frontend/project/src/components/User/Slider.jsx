import React from 'react';
import { Link } from 'react-router-dom';
import urlImage from '../../assets/urlImage.svg';
import qrImage from '../../assets/qrImage.jpg'; // Add a new image for QR

const Slider = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-20 mx-auto text-center">
        <p className="font-serif text-xl text-blue-900 font-bold">
          Short links, long-lasting impact—start optimizing your URLs today!
        </p>
        <h1 className="font-extrabold text-3xl text-blue-950 font-sans mt-4 mb-6">
          The ShareGO Platform
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          {/* URL Shortener Card */}
          <div className="h-[300px] w-[300px] bg-gray-100 p-4 shadow-xl rounded-xl hover:scale-105 transform transition duration-300">
            <Link to="/url">
              <img
                src={urlImage}
                alt="URL Shortener"
                className="h-[80%] w-[80%] mx-auto border-2 rounded-xl shadow-xl shadow-slate-600 hover:opacity-80"
              />
            </Link>
            <h3 className="text-center font-serif text-base text-black mt-6">URL Shortener</h3>
          </div>

          {/* QR Code Card */}
          <div className="h-[300px] w-[300px] bg-gray-100 p-4 shadow-xl rounded-xl hover:scale-105 transform transition duration-300">
            <Link to="/qr">
              <img
                src={qrImage}  
                alt="QR Code"
                className="h-[80%] w-[80%] mx-auto border-2 rounded-xl shadow-xl shadow-slate-600 hover:opacity-80"
              />
            </Link>
            <h3 className="text-center font-serif text-base text-black mt-6">QR Code</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
