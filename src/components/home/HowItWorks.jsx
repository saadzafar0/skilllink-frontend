import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 px-8 bg-gray-100 text-center">
      <div className="mb-12">
        <h2 className="text-4xl text-teal-700 font-bold mb-2">How SkillLink Works</h2>
        <p className="text-lg text-gray-800">Connecting clients and freelancers in just a few easy steps.</p>
      </div>
      <div className="flex justify-center gap-8 flex-wrap">
        <div className="bg-white p-8 rounded-[10px] shadow-md w-[300px] hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-teal-700 text-xl font-semibold mb-4">1. Create Your Profile</h3>
          <p className="text-gray-600 text-base">Sign up and set up your freelancer or client profile to get started.</p>
        </div>
        <div className="bg-white p-8 rounded-[10px] shadow-md w-[300px] hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-teal-700 text-xl font-semibold mb-4">2. Browse or Post Jobs</h3>
          <p className="text-gray-600 text-base">Find projects that match your skills, or post jobs for freelancers to apply.</p>
        </div>
        <div className="bg-white p-8 rounded-[10px] shadow-md w-[300px] hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-teal-700 text-xl font-semibold mb-4">3. Start Working & Earning</h3>
          <p className="text-gray-600 text-base">Collaborate, deliver quality work, and get paid securely through SkillLink.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
