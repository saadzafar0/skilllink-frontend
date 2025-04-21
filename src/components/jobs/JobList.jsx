import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

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

  if (loading) return <div className="text-center text-white py-6">Loading jobs...</div>;
  if (jobs.length === 0) return <div className="text-center text-white py-6">No jobs found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-[#0f131a] rounded-lg min-h-[70vh]">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.jobID} job={job} />
        ))
      ) : (
        <div className="col-span-full text-center text-[#4a5568] py-16">
          <h3 className="text-[#1abc9c] mb-4 text-xl font-semibold">No jobs found matching your criteria</h3>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default JobList;
