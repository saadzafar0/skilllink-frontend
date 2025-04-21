import React, { useState, useEffect } from "react";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    level: "",
    connects: null,
    sortBy: "",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newValue =
        name === "connects" ? (value ? Number(value) : null) : value;
      const newFilters = { ...prev, [name]: newValue };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-white w-64 font-sans">
      <h3 className="mb-4 text-teal-400 text-xl">Filter Jobs</h3>

      {/*  Keyword Filter */}
      <div className="mb-5 flex flex-col">
        <label htmlFor="keyword" className="mb-2 font-semibold text-teal-200">
          Keyword
        </label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="e.g. React, design..."
          className="p-2 rounded-lg border-none focus:outline-none"
        />
      </div>

      {/* Job Level Filter */}
      <div className="mb-5 flex flex-col">
        <label htmlFor="level" className="mb-2 font-semibold text-teal-200">
          Job Level
        </label>
        <select
          id="level"
          name="level"
          value={filters.level}
          onChange={handleChange}
          className="p-2 rounded-lg border-none focus:outline-none"
        >
          <option value="">Any</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {/* Connects Range Filter */}
      <div className="mb-5 flex flex-col">
        <label htmlFor="connects" className="font-semibold text-teal-200">
          Max Connects Required: <span>{filters.connects}</span>
        </label>
        <input
          type="range"
          id="connects"
          name="connects"
          min="1"
          max="100"
          value={filters.connects || 100}
          onChange={handleChange}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-teal-300 mt-1">
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="mb-5 flex flex-col">
        <label htmlFor="sortBy" className="mb-2 font-semibold text-teal-200">
          Sort By
        </label>
        <select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="p-2 rounded-lg border-none focus:outline-none"
        >
          <option value="">Default</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="connectsLow">Fewest Connects</option>
          <option value="connectsHigh">Most Connects</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
