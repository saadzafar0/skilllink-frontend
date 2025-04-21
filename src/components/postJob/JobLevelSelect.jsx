import React from 'react';

const JobLevelSelect = ({ jobLevel, setJobLevel }) => {
  const handleChange = (e) => {
    setJobLevel(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="job-level" className="font-semibold mb-2 text-[#04ffcd]">
        Job Level <span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id="job-level"
        value={jobLevel}
        onChange={handleChange}
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg w-full outline-none transition-all ease-in-out focus:border-[#1abc9c]"
      >
        <option value="Beginner" className="bg-[#121212] text-white">Beginner</option>
        <option value="Intermediate" className="bg-[#121212] text-white">Intermediate</option>
        <option value="Advanced" className="bg-[#121212] text-white">Advanced</option>
        <option value="Expert" className="bg-[#121212] text-white">Expert</option>
      </select>
    </div>
  );
};

export default JobLevelSelect;
