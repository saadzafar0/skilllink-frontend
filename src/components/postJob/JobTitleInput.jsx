import React from 'react';

const JobTitleInput = ({ title, setTitle }) => {
  return (
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="jobTitle" className="font-semibold mb-2 text-[#04ffcd]">
        Job Title <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type="text"
        id="jobTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={150}
        placeholder="e.g., Build a Portfolio Website"
        required
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg outline-none transition-all ease-in-out focus:border-[#1abc9c]"
      />
      <small className="mt-1 text-gray-400 text-sm">{title.length}/150 characters</small>
    </div>
  );
};

export default JobTitleInput;
