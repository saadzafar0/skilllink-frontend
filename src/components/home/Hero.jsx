import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-black to-teal-700 text-white py-20 px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Welcome to SkillLink</h1>
        <p className="text-xl mb-8">
          Where top clients and skilled freelancers connect to create magic. Start your journey today!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/register"
            className="bg-teal-500 hover:bg-teal-600 text-white py-3 px-8 rounded-[10px] font-semibold transition-all duration-300"
          >
            Join as Freelancer
          </Link>
          <Link
            to="/login"
            className="border-2 border-white text-white hover:bg-white hover:text-black py-3 px-8 rounded-[10px] font-semibold transition-all duration-300"
          >
            Hire Talent
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
