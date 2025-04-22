//SkillsList.jsx
import React from "react";

const SkillsList = ({ skills }) => (
  <div className="bg-[#303030] p-5 rounded-lg mb-5">
    <h3 className="text-2xl text-[#47f9ff]">Required Skills</h3>
    <ul className="list-none p-0">
      {skills.map((skill, idx) => (
        <li key={idx} className="text-base text-[#c1faff]">{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillsList;
