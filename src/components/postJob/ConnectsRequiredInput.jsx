import React, { useState } from 'react';

const ConnectsRequiredInput = ({ connectsRequired, setConnectsRequired }) => {
  const [inputValue, setInputValue] = useState(connectsRequired);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) { // Allow only numbers
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (value > 0 && value <= 100) {
      setConnectsRequired(value);
    }
  };

  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="connects" className="font-semibold mb-2 text-[#04ffcd]">
        Connects Required <span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="connects"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          placeholder="Enter number of connects (1-100)"
          className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-3 rounded-lg text-base w-full outline-none transition-colors duration-300 focus:border-[#1abc9c] placeholder:text-[#7f8c8d]"
        />
      </div>
    </div>
  );
};

export default ConnectsRequiredInput;
