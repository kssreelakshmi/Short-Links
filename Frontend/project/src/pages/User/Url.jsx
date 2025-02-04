import React from 'react';
import AllLinks from '../../components/User/AllLinks';

const Url = () => {
  return (
    <>
      <div className='w-full h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center'>
        <div className='font-mono text-4xl font-extrabold text-blue-800 text-center mt-12'>
          <h1>URL Shortener</h1>
        </div>
        <div className='font-serif text-lg text-gray-700 text-center mt-6 mx-8'>
          <p>
            Easily shorten your long URLs into compact links for quick sharing!
            <br />
            Streamline your online experience with just one click.
          </p>
        </div>
        <div className='h-auto w-[90%] md:w-[50%] border-2 border-gray-300 bg-white shadow-md flex flex-col items-center mx-auto mt-12 rounded-2xl p-8 space-y-6'>
          <label htmlFor="url" className='font-bold text-gray-700 text-lg'>
            Paste Your Link Below
          </label>

          <div className='flex w-full space-x-2'>
            <input
              type="text"
              placeholder='Enter URL'
              className='flex-1 h-12 bg-gray-100 border border-gray-300 rounded-xl px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            />
            <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 h-12 rounded-xl transition duration-200'
            >
              Shorten
            </button>
          </div>

          <div className='flex w-full space-x-2'>
            <input
              type="text"
              value="shortened-url-link.com"
              readOnly
              className='flex-1 h-12 bg-gray-100 border border-gray-300 rounded-xl px-4 focus:outline-none cursor-default'
            />
            <button
              type='button'
              className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 h-12 rounded-xl transition duration-200'
            >
              Copy
            </button>
          </div>
        </div>
        <div>
         < AllLinks />
        </div>
      </div>
    </>
  );
};

export default Url;
