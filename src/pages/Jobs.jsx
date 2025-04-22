import React, { useState, useEffect } from "react";
import Filters from "../components/jobs/Filters";
import JobList from "../components/jobs/JobList";
import { useAuth } from "../context/AuthContext";
import "../styles/Jobs.css";

const Jobs = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: "",
    level: "",
    connects: null,
    sortBy: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // ✅ Fetch all available jobs for freelancers
        const res = await fetch("http://localhost:4000/api/v1/jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-page">
      <div className="jobs-sidebar">
        <Filters onFilterChange={setFilters} />
      </div>

      <div className="jobs-main">
        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">No jobs found</div>
        ) : (
          <JobList jobs={jobs} filters={filters} showActions />
        )}
      </div>
    </div>
  );
};

export default Jobs;