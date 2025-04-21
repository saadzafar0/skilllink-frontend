import React from 'react';

const JobDescriptionInput = ({ description, setDescription }) => {
  return (
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="jobDescription" className="font-semibold mb-2 text-[#04ffcd]">
        Job Description<span className="text-red-500 ml-1">*</span>
      </label>
      <textarea
        id="jobDescription"
        rows="6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1000}
        placeholder="Describe the project and expectations in detail"
        required
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg resize-y outline-none focus:border-[#1abc9c] transition-all ease-in-out"
      ></textarea>
      <small className="mt-1 text-gray-400 text-sm">{description.length}/1000 characters</small>
    </div>
  );
};

export default JobDescriptionInput;
