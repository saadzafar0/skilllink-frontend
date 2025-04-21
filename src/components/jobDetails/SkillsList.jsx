import React from "react";

const SkillsList = ({ skills }) => (
  <div className="bg-gray-800 p-5 rounded-lg mb-5">
    <h3 className="text-xl text-cyan-300 mb-4">Required Skills</h3>
    <ul className="list-none p-0">
      {skills.map((skill, idx) => (
        <li key={idx} className="text-sm text-cyan-100">{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillsList;
