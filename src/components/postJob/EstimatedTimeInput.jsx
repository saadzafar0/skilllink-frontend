import React from 'react';

const EstimatedTimeInput = ({ estTime, setEstTime }) => {
  const handleChange = (e) => {
    setEstTime(e.target.value);
  };

  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="estimated-time" className="font-semibold mb-2 text-[#04ffcd]">
        Estimated Time <span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <select
        id="estimated-time"
        value={estTime}
        onChange={handleChange}
        className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-3 rounded-lg text-base w-full outline-none transition-colors duration-300 focus:border-[#1abc9c] [&>option]:bg-[#121212] [&>option]:text-white"
      >
        <option value="1 week">1 week</option>
        <option value="2 weeks">2 weeks</option>
        <option value="1 month">1 month</option>
        <option value=" > 1 month">Other</option>
      </select>
    </div>
  );
};

export default EstimatedTimeInput;
