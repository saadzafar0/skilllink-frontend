// src/components/common/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to SkillLink</h1>
        <p>Where top clients and skilled freelancers connect to create magic. Start your journey today!</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn-primary">Join as Freelancer</Link>
          <Link to="/login" className="btn-secondary">Hire Talent</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
