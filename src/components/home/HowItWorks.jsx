import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 px-8 bg-[#f8f9fa] text-center">
      <div>
        <h2 className="text-4xl mb-2 text-[#008080]">How SkillLink Works</h2>
        <p className="text-lg text-[#333] mb-12">Connecting clients and freelancers in just a few easy steps.</p>
      </div>
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] transition-transform duration-300 hover:-translate-y-1">
          <h3 className="text-[#008080] mb-4">1. Create Your Profile</h3>
          <p className="text-[#555] text-base">Sign up and set up your freelancer or client profile to get started.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] transition-transform duration-300 hover:-translate-y-1">
          <h3 className="text-[#008080] mb-4">2. Browse or Post Jobs</h3>
          <p className="text-[#555] text-base">Find projects that match your skills, or post jobs for freelancers to apply.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] transition-transform duration-300 hover:-translate-y-1">
          <h3 className="text-[#008080] mb-4">3. Start Working & Earning</h3>
          <p className="text-[#555] text-base">Collaborate, deliver quality work, and get paid securely through SkillLink.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
