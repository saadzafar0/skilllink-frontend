// Jobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../components/jobs/JobList";
import Filters from "../components/jobs/Filters";

const BrowseJobs = () => {
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
    // Changed from job.title to job.Title to match the API response format
    const matchesSearch = job.Title && job.Title.toLowerCase().includes(filters.search.toLowerCase());
    
    // Use targetSkills for category filtering
    const matchesCategory = !filters.category || 
      (job.targetSkills && job.targetSkills.toLowerCase().includes(filters.category.toLowerCase()));
    
    // Added null check for job.price
    const matchesMinPrice = !filters.minPrice || (job.price !== null && job.price >= parseInt(filters.minPrice));
    const matchesMaxPrice = !filters.maxPrice || (job.price !== null && job.price <= parseInt(filters.maxPrice));
    
    // Added null check for job.jobLevel
    const matchesJobLevel = !filters.jobLevel || (job.jobLevel && job.jobLevel === filters.jobLevel);

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
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            {/* Pass the filtered jobs directly to JobList */}
            <JobList jobs={filteredJobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;