import React from 'react';

const EstimatedTimeInput = ({ estTime, setEstTime }) => {
  const handleChange = (e) => {
    setEstTime(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="estimated-time" className="font-semibold mb-2 text-[#04ffcd]">
        Estimated Time <span className="text-red-500 ml-1">*</span>
      </label>
      <select
        id="estimated-time"
        value={estTime}
        onChange={handleChange}
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg w-full focus:border-[#1abc9c] transition-all ease-in-out"
      >
        <option value="1 week">1 week</option>
        <option value="2 weeks">2 weeks</option>
        <option value="1 month">1 month</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

export default EstimatedTimeInput;
