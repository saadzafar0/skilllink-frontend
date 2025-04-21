import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-[#1a1f2b] rounded-lg p-6 relative overflow-hidden transition-transform transform hover:translate-y-[-5px] hover:shadow-lg hover:shadow-[#1abc9c55] border border-[#1abc9c55]">
      <h3 className="text-[#1abc9c] text-xl mb-4">{job.Title}</h3>
      <div className="flex gap-3 mb-5">
        <span className="bg-[#1abc9c22] text-[#1abc9c] py-1 px-3 rounded-full text-sm font-semibold">
          {job.jobLevel}
        </span>
        <span className="bg-[#1abc9c11] text-[#7fdbca] py-1 px-3 rounded-full text-sm">
          🔗 {job.connectsRequired}
        </span>
      </div>
      <p className="text-[#a3b2c2] text-sm leading-relaxed mb-6 min-h-[40px]">
        {job.targetSkills
          ? job.targetSkills.split(",").join(" • ")
          : "No specific skills"}
      </p>
      <Link
        to={`/jobs/${job.jobID}`}
        className="inline-flex items-center gap-2 text-[#1abc9c] font-semibold transition-all hover:text-white hover:gap-3"
      >
        View Details
        <span className="transition-transform transform hover:translate-x-1">→</span>
      </Link>
    </div>
  );
};

export default JobCard;
