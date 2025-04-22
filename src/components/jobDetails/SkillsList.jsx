//SkillsList.jsx
import React from "react";
import "./SkillsList.css"; 
const SkillsList = ({ skills }) => (
  <div className="skills-list">
    <h3>Required Skills</h3>
    <ul>
      {skills.map((skill, idx) => (
        <li key={idx}>{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillsList;
