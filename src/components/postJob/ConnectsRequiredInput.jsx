import React, { useState } from 'react';
import './ConnectsRequiredInput.css';

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
    <div className="connects-required-input">
      <label htmlFor="connects">Connects Required <span className="required">*</span></label>
      <div className="input-container">
        <input
          id="connects"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit} // Submit on blur
          placeholder="Enter number of connects (1-100)"
        />
      </div>
    </div>
  );
};

export default ConnectsRequiredInput;
