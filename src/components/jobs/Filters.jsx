import React from "react";

const Filters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
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
          value={filters.search}
          onChange={handleChange}
          placeholder="Search jobs..."
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block text-[#c1faff]">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        >
          <option value="">All Categories</option>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile Development</option>
          <option value="design">Design</option>
          <option value="writing">Writing</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="minPrice" className="block text-[#c1faff]">Minimum Price ($)</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          value={filters.minPrice}
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
          value={filters.maxPrice}
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
          value={filters.jobLevel}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-[#404040] text-[#c1faff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
        >
          <option value="">All Levels</option>
          <option value="entry">Entry Level</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
