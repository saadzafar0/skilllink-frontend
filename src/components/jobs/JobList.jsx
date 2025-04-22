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

  if (loading) return <div className="loading">Loading jobs...</div>;
  if (jobs.length === 0) return <div className="no-jobs">No jobs found</div>;
  return (
    <div className="job-list-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job.jobID} job={job} />
        ))
      ) : (
        <div className="no-jobs">
          <h3>No jobs found matching your criteria</h3>
          <p>Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default JobList;