import React, { useState } from 'react';
import './RequiredSkillsInput.css';

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
    <div className="required-skills-input">
      <label htmlFor="skills">Required Skills <span className="required">*</span></label>
      <div className="skills-input-container">
        <input
          id="skills"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)} // Add skill on "Enter"
          placeholder="Add skill and press Enter"
        />
        <button onClick={handleAddSkill} className="add-skill-btn">
          + Add
        </button>
      </div>
      <div className="selected-skills">
        {targetSkills.map((s, index) => (
          <div key={index} className="skill-tag">
            <span>{s}</span>
            <button onClick={() => handleRemoveSkill(s)} className="remove-skill-btn">
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequiredSkillsInput;
