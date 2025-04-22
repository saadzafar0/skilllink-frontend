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
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="skills" className="font-semibold mb-2 text-[#04ffcd]">
        Required Skills <span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="skills"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
          placeholder="Add skill and press Enter"
          className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-3 rounded-lg text-base w-full outline-none transition-colors duration-300 focus:border-[#1abc9c]"
        />
        <button 
          onClick={handleAddSkill} 
          className="bg-[#16a085] text-white px-4 py-2 rounded-lg border-none cursor-pointer font-bold hover:bg-[#1abc9c] transition-colors duration-300"
        >
          + Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {targetSkills.map((s, index) => (
          <div key={index} className="bg-[#34495e] p-2 rounded flex items-center gap-2">
            <span className="text-sm text-white">{s}</span>
            <button 
              onClick={() => handleRemoveSkill(s)} 
              className="bg-transparent border-none text-[#e74c3c] text-lg cursor-pointer"
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
