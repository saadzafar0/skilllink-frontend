// /pages/Home.jsx
import React from 'react';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import PopularCategories from '../components/home/PopularCategories';
const Home = () => {
  return (
    <>
     <div>
        <Hero />
        <HowItWorks />
        <PopularCategories />
     </div>
    </>
  );
};

export default Home;
