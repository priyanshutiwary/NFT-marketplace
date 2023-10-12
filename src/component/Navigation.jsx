import React from 'react';

const Navigation = ({ activePage }) => {
  return (
    <div>
      <div className='text-gray-200 bg-gray-800 font-bold text-xl h-16 flex flex-row items-center px-4 sm:px-6 md:px-8'>
        <a href="/Home" className={`${
          activePage === 'Home' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Home
        </a>
        <a href="/Explore" className={`${
          activePage === 'Explore' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Explore
        </a>
        <a href="/Sell" className={`${
          activePage === 'Sell' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl mr-4 sm:mr-6`}>
          Sell
        </a>
        <a href="/Create" className={`${
          activePage === 'Create' ? 'text-purple-700' : 'text-white'
        } text-sm sm:text-base lg:text-lg xl:text-xl`}>
          Create
        </a>
      </div>
    </div>
  );
};

export default Navigation;
