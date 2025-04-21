import React from "react";
import { Link } from "react-router-dom";
import "./JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.Title}</h3>
      <div className="job-meta">
        <span className="job-level">{job.jobLevel}</span>
        <span className="job-connects">🔗 {job.connectsRequired}</span>
      </div>
      <p className="job-skills">
        {job.targetSkills
          ? job.targetSkills.split(",").join(" • ")
          : "No specific skills"}
      </p>
      <Link to={`/jobs/${job.jobID}`} className="job-link">
        View Details →
      </Link>
    </div>
  );
};

export default JobCard;
