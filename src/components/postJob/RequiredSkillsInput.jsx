import React, { useState } from 'react';

const RequiredSkillsInput = ({ targetSkills, setTargetSkills }) => {
  const [skill, setSkill] = useState("");

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skill && !targetSkills.includes(skill)) {
      setTargetSkills([...targetSkills, skill]);
      setSkill(""); // Clear the input field after adding
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTargetSkills(targetSkills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="skills" className="font-semibold mb-2 text-[#04ffcd]">
        Required Skills <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="skills-input-container flex gap-2 items-center">
        <input
          id="skills"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)} // Add skill on "Enter"
          placeholder="Add skill and press Enter"
          className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg outline-none transition-all ease-in-out focus:border-[#1abc9c]"
        />
        <button 
          onClick={handleAddSkill} 
          className="bg-[#16a085] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1abc9c]"
        >
          + Add
        </button>
      </div>
      <div className="selected-skills flex flex-wrap gap-2 mt-4">
        {targetSkills.map((s, index) => (
          <div key={index} className="skill-tag bg-[#34495e] py-2 px-3 rounded-md flex items-center gap-2">
            <span className="text-white text-sm">{s}</span>
            <button 
              onClick={() => handleRemoveSkill(s)} 
              className="bg-none border-none text-[#e74c3c] text-xl cursor-pointer"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredSkillsInput;
