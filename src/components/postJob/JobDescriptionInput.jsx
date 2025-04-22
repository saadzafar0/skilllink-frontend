import React from 'react';

const JobDescriptionInput = ({ description, setDescription }) => {
  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="jobDescription" className="font-semibold mb-2 text-[#04ffcd]">
        Job Description<span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <textarea
        id="jobDescription"
        rows="6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1000}
        placeholder="Describe the project and expectations in detail"
        required
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-base resize-y outline-none transition-colors duration-300 focus:border-[#1abc9c]"
      ></textarea>
      <small className="mt-1 text-[#888] text-sm">{description.length}/1000 characters</small>
    </div>
  );
};

export default JobDescriptionInput;
