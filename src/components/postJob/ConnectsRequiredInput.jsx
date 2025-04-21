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
    <div className="mb-6 flex flex-col text-white font-sans">
      <label htmlFor="connects" className="font-semibold mb-2 text-[#04ffcd]">
        Connects Required <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="flex gap-2 items-center">
        <input
          id="connects"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit} // Submit on blur
          placeholder="Enter number of connects (1-100)"
          className="bg-[#121212] text-white border border-[#04ffcd] py-3 px-4 rounded-lg text-lg w-full focus:border-[#1abc9c] transition-all ease-in-out"
        />
      </div>
    </div>
  );
};

export default ConnectsRequiredInput;
