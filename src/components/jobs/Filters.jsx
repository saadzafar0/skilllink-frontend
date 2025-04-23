// Filters.jsx
import React from "react";

const Filters = ({ filters, onFilterChange }) => {
  // Add default value to prevent errors if filters is undefined
  const safeFilters = filters || {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    jobLevel: "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...safeFilters, [name]: value });
  };

  return (
    <div className="bg-[#303030] rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-[#1abc9c] mb-4">Filters</h2>
      
      <div className="space-y-2">
        <label htmlFor="search" className="block text-[#c1faff]">Search</label>
        <input
          type="text"
          id="search"
          name="search"
          value={safeFilters.search}
          onChange={handleChange}
          placeholder="Search jobs..."
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-[#c1faff]">Skills</label>
        <select
          id="category"
          name="category"
          value={safeFilters.category}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        >
          <option value="">All Skills</option>
          <option value="web">Web Development</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="mongodb">MongoDB</option>
          <option value="business">Business Strategy</option>
          <option value="engineering">Engineering</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="minPrice" className="block text-[#c1faff]">Minimum Price ($)</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          value={safeFilters.minPrice}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="maxPrice" className="block text-[#c1faff]">Maximum Price ($)</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={safeFilters.maxPrice}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="jobLevel" className="block text-[#c1faff]">Job Level</label>
        <select
          id="jobLevel"
          name="jobLevel"
          value={safeFilters.jobLevel}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;