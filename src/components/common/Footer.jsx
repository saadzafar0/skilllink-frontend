import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-[#ccc] py-5 text-center text-sm mt-12">
      <p>© {new Date().getFullYear()} SkillLink. All rights reserved.</p>
      <div className="mt-2.5 flex justify-center gap-5 flex-wrap">
        <a href="#" className="text-[#00cfc8] no-underline transition-colors duration-300 hover:text-white">Privacy Policy</a>
        <a href="#" className="text-[#00cfc8] no-underline transition-colors duration-300 hover:text-white">Terms</a>
        <a href="#" className="text-[#00cfc8] no-underline transition-colors duration-300 hover:text-white">Support</a>
      </div>
    </footer>
  );
};

export default Footer;
 