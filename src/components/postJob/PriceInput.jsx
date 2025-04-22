import React, { useState } from 'react';
import './PriceInput.css';

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
    <div className="price-input">
      <label htmlFor="price">Budget / Price <span className="required">*</span></label>
      <div className="input-container">
        <input
          id="price"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSubmit}
          placeholder="Enter price ($1 - $10,000)"
        />
      </div>
    </div>
  );
};

export default PriceInput;
