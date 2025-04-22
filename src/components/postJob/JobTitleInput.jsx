import React from 'react';

const JobTitleInput = ({ title, setTitle }) => {
  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="jobTitle" className="font-semibold mb-2 text-[#04ffcd]">
        Job Title<span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <input
        type="text"
        id="jobTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={150}
        placeholder="e.g., Build a Portfolio Website"
        required
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-base outline-none transition-colors duration-300 focus:border-[#1abc9c]"
      />
      <small className="mt-1 text-[#888] text-sm">{title.length}/150 characters</small>
    </div>
  );
};

export default JobTitleInput;
