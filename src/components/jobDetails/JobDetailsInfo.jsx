// JobDetailsInfo.jsx
import React from "react";
import "./JobDetailsInfo.css"; 
const JobDetailsInfo = ({ jobLevel, estTime, connectsRequired, postedOn }) => (
  <div className="job-details-info">
    <p><strong>Level:</strong> {jobLevel}</p>
    <p><strong>Estimated Time:</strong> {estTime}</p>
    <p><strong>Connects Required:</strong> {connectsRequired}</p>
    <p><strong>Posted On:</strong> {new Date(postedOn).toLocaleDateString()}</p>
  </div>
);

export default JobDetailsInfo;
