import React, { useState } from 'react';
import Filters from '../components/jobs/Filters';
import JobList from '../components/jobs/JobList';
import '../styles/Jobs.css';

// In Jobs.jsx - Update initial state
const Jobs = () => {
  const [activeFilters, setActiveFilters] = useState({
    keyword: '',
    level: '',
    connects: null,  // Changed from 100 to null  
    sortBy: ''
  });

  return (
    <div className="jobs-page">
      <div className="jobs-sidebar">
        <Filters onFilterChange={setActiveFilters} />
      </div>
      <div className="jobs-main">
        <JobList filters={activeFilters} />
      </div>
    </div>
  );
};

export default Jobs;