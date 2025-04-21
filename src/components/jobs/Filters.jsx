import React, { useState, useEffect } from "react";
import "./Filters.css";

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
    <div className="filters-container">
      <h3>Filter Jobs</h3>

      {/*  Keyword Filter (fixed to use text input) */}
      <div className="filter-group">
        <label htmlFor="keyword">Keyword</label>
        <input
          type="text"
          id="keyword"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="e.g. React, design..."
        />
      </div>

      {/* Job Level Filter */}
      <div className="filter-group">
        <label htmlFor="level">Job Level</label>
        <select
          id="level"
          name="level"
          value={filters.level}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {/* Connects Range Filter */}
      <div className="filter-group">
        <label htmlFor="connects">
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
        />
        <div className="range-labels">
          <span>1</span>
          <span>100</span>
        </div>
      </div>

      {/* Sort By Filter */}
      <div className="filter-group">
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
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
