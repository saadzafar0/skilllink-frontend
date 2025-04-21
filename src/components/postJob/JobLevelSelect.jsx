import React from 'react';
import './JobLevelSelect.css';

const JobLevelSelect = ({ jobLevel, setJobLevel }) => {
  const handleChange = (e) => {
    setJobLevel(e.target.value);
  };

  return (
    <div className="job-level-select">
      <label htmlFor="job-level">Job Level <span className="required">*</span></label>
      <select
        id="job-level"
        value={jobLevel}
        onChange={handleChange}
        className="select-input"
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
