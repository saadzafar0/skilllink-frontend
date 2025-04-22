// JobDescription.jsx
import React from "react";
import "./JobDescription.css"; 
const JobDescription = ({ description }) => (
  <div className="job-description">
    <h3>Description</h3>
    <p>{description}</p>
  </div>
);

export default JobDescription;
