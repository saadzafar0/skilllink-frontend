import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-[#ccc] py-5 text-center text-sm mt-12">
      <p>© {new Date().getFullYear()} SkillLink. All rights reserved.</p>
      <div className="mt-3 flex justify-center flex-wrap gap-5">
        <a
          href="#"
          className="text-[#00cfc8] hover:text-white transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[#00cfc8] hover:text-white transition-colors duration-300"
        >
          Terms
        </a>
        <a
          href="#"
          className="text-[#00cfc8] hover:text-white transition-colors duration-300"
        >
          Support
        </a>
      </div>
    </footer>
  );
};

export default Footer;
