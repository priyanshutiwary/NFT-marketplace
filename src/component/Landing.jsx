import React, { useEffect, useState } from 'react';

import image from '../assets/logo.jpeg';

const Landing = () => {
  
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const delay = 4000; // 4 seconds

    const timer = setTimeout(() => {
      setShowContent(false);
      // Redirect to the home page
      window.location.href = '/Home';
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  if (showContent) {
    return (
      <div className='bg-black h-screen flex flex-col justify-center items-center'>
        <img className='h-28 w-28' src={image} alt="" />
        <h1 className='text-white text-3xl font-extrabold mt-4'>Bon-NFT</h1>
      </div>
    );
  }

  return null;
}

export default Landing;
