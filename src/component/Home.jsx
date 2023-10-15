import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

const Home = () => {
  

  

  const activePage = 'Home';

  return (
    <>
      <div className="">
        <Navigation activePage={activePage} />
        
        <div className="w-full sm:w-3/4 p-24">
          <h1 className="text-gray-200">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel quos quibusdam, quidem deleniti blanditiis animi
            eum ducimus obcaecati dolores? Maiores molestias, quae sapiente voluptatum nobis aspernatur maxime perferendis
            culpa officiis!
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
