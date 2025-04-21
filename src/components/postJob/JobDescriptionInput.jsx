import React from 'react';
import './JobDescriptionInput.css';

const JobDescriptionInput = ({ description, setDescription }) => {
  return (
    <div className="job-description-input">
      <label htmlFor="jobDescription">Job Description<span className="required">*</span></label>
      <textarea
        id="jobDescription"
        rows="6"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1000}
        placeholder="Describe the project and expectations in detail"
        required
      ></textarea>
      <small>{description.length}/1000 characters</small>
    </div>
  );
};

export default JobDescriptionInput;
