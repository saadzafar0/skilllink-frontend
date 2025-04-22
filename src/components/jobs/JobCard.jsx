// /components/jobs/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, showActions, onDelete, onEdit }) => {
  return (
    <div className="bg-[#1a1f2b] rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ease-in-out border border-[#1abc9c55] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(26,188,156,0.15)]">
      <h3 className="text-[#1abc9c] m-0 mb-4 text-xl">{job.Title}</h3>

      <div className="flex gap-3 mb-5">
        <span className="bg-[#1abc9c22] text-[#1abc9c] px-3 py-1 rounded-full text-sm font-semibold">{job.jobLevel}</span>
        <span className="bg-[#1abc9c11] text-[#7fdbca] px-3 py-1 rounded-full text-sm">🔗 {job.connectsRequired}</span>
      </div>

      <p className="text-[#a3b2c2] text-sm leading-relaxed mb-6 min-h-[40px]">
        {job.targetSkills
          ? job.targetSkills.split(",").join(" • ")
          : "No specific skills"}
      </p>

      <Link 
        to={`/jobs/${job.jobID}`} 
        className="inline-flex items-center gap-2 text-[#1abc9c] no-underline font-semibold transition-all duration-300 hover:text-white hover:gap-3 group"
      >
        View Details
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>

      {showActions && (
        <div className="mt-4 flex gap-4 flex-wrap">
          <button 
            onClick={() => onEdit(job.jobID)}
            className="bg-[#0ab3af] text-white px-3 py-1.5 rounded-md text-sm hover:bg-[#088e8a] transition-colors duration-300"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(job.jobID)}
            className="bg-[#0ab3af] text-white px-3 py-1.5 rounded-md text-sm hover:bg-[#088e8a] transition-colors duration-300"
          >
            Delete
          </button>
          <Link 
            to={`/jobProposals/${job.jobID}`}
            className="bg-[#0ab3af] text-white px-3 py-1.5 rounded-md text-sm hover:bg-[#088e8a] transition-colors duration-300 no-underline"
          >
            Manage Proposals
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
