import React, { useState } from 'react';
import Filters from '../components/jobs/Filters';
import JobList from '../components/jobs/JobList';

const Jobs = () => {
  const [activeFilters, setActiveFilters] = useState({
    keyword: '',
    level: '',
    connects: null,
    sortBy: ''
  });

  return (
    <div className="flex gap-8 p-8 min-h-screen bg-[#121212] text-white">
      <div className="w-[250px] flex-shrink-0">
        <Filters onFilterChange={setActiveFilters} />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        <JobList filters={activeFilters} />
      </div>
    </div>
  );
};

export default Jobs;
