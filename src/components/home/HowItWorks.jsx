import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-section">
      <div className="how-header">
        <h2>How SkillLink Works</h2>
        <p>Connecting clients and freelancers in just a few easy steps.</p>
      </div>
      <div className="how-cards">
        <div className="how-card">
          <h3>1. Create Your Profile</h3>
          <p>Sign up and set up your freelancer or client profile to get started.</p>
        </div>
        <div className="how-card">
          <h3>2. Browse or Post Jobs</h3>
          <p>Find projects that match your skills, or post jobs for freelancers to apply.</p>
        </div>
        <div className="how-card">
          <h3>3. Start Working & Earning</h3>
          <p>Collaborate, deliver quality work, and get paid securely through SkillLink.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
