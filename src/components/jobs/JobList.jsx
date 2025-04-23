import React from "react";
import { Link } from "react-router-dom";

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <div className="text-[#c1faff] text-center py-8">No jobs found</div>;
  }
  
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Link
          key={job.jobID}
          to={`/jobDetails/${job.jobID}`}
          className="block bg-[#303030] rounded-lg p-6 hover:bg-[#404040] transition-colors duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#1abc9c] mb-2">{job.Title}</h2>
              <p className="text-[#c1faff] mb-4 line-clamp-2">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.targetSkills && job.targetSkills.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#404040] text-[#c1faff] rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-2xl font-bold text-[#1abc9c]">
                {job.price !== null ? `$${job.price}` : "Price on request"}
              </span>
              <span className="text-[#c1faff] text-sm">{job.jobLevel}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobList;