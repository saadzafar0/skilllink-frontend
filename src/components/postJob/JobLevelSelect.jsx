import React from 'react';

const JobLevelSelect = ({ jobLevel, setJobLevel }) => {
  const handleChange = (e) => {
    setJobLevel(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="job-level" className="font-semibold mb-2 text-[#04ffcd]">
        Job Level <span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <select
        id="job-level"
        value={jobLevel}
        onChange={handleChange}
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-3 rounded-lg text-base w-full outline-none transition-colors duration-300 focus:border-[#1abc9c] [&>option]:bg-[#121212] [&>option]:text-white"
      >
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>
    </div>
  );
};

export default JobLevelSelect;
