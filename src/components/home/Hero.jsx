// src/components/common/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-black to-[#008080] text-white py-20 px-8 text-center">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-5xl font-bold mb-4">Welcome to SkillLink</h1>
        <p className="text-xl mb-8">Where top clients and skilled freelancers connect to create magic. Start your journey today!</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link 
            to="/register" 
            className="px-8 py-3 rounded-lg font-semibold no-underline bg-[#14b8a6] text-white transition-all duration-300 hover:bg-[#0d9488]"
          >
            Join as Freelancer
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-3 rounded-lg font-semibold no-underline border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Hire Talent
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
