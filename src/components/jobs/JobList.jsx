import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobList = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/api/v1/jobs", {
          params: filters,
          signal: abortController.signal,
          paramsSerializer: {
            indexes: null
          }
        });
        setJobs(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Failed to fetch jobs:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    return () => abortController.abort();
  }, [filters]);

  if (loading) return <div className="text-[#4a5568] text-center py-8">Loading jobs...</div>;
  if (jobs.length === 0) return <div className="text-[#4a5568] text-center py-8">No jobs found</div>;
  
  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <Link
          key={job._id}
          to={`/jobs/${job._id}`}
          className="block bg-[#303030] rounded-lg p-6 hover:bg-[#404040] transition-colors duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#1abc9c] mb-2">{job.title}</h2>
              <p className="text-[#c1faff] mb-4 line-clamp-2">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#404040] text-[#c1faff] rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-2xl font-bold text-[#1abc9c]">${job.price}</span>
              <span className="text-[#c1faff] text-sm">{job.jobLevel}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobList;