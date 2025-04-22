import React, { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../components/jobs/JobList";
import Filters from "../components/jobs/Filters";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    jobLevel: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/jobs");
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesMinPrice = !filters.minPrice || job.price >= parseInt(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || job.price <= parseInt(filters.maxPrice);
    const matchesJobLevel = !filters.jobLevel || job.jobLevel === filters.jobLevel;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesJobLevel;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">Available Jobs</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;