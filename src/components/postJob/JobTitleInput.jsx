import React from 'react';
import './JobTitleInput.css';

const JobTitleInput = ({ title, setTitle }) => {
  return (
    <div className="job-title-input">
      <label htmlFor="jobTitle">Job Title<span className="required">*</span></label>
      <input
        type="text"
        id="jobTitle"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={150}
        placeholder="e.g., Build a Portfolio Website"
        required
      />
      <small>{title.length}/150 characters</small>
    </div>
  );
};

export default JobTitleInput;
