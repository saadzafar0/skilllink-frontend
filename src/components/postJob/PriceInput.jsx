import React, { useState } from 'react';

const PriceInput = ({ price, setPrice }) => {
  const [inputValue, setInputValue] = useState(price);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (value >= 1 && value <= 10000) {
      setPrice(value);
    }
  };

  return (
    <div className="mb-6 flex flex-col text-white font-['Segoe_UI']">
      <label htmlFor="price" className="font-semibold mb-2 text-[#04ffcd]">
        Budget / Price <span className="text-[#e74c3c] ml-1">*</span>
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="price"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          placeholder="Enter price ($1 - $10,000)"
          className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-3 rounded-lg text-base w-full outline-none transition-colors duration-300 focus:border-[#1abc9c] placeholder:text-[#7f8c8d]"
        />
      </div>
    </div>
  );
};

export default PriceInput;
