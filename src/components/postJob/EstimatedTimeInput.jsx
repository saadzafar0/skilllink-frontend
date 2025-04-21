import React from 'react';
import './EstimatedTimeInput.css';

const EstimatedTimeInput = ({ estTime, setEstTime }) => {
  const handleChange = (e) => {
    setEstTime(e.target.value);
  };

  return (
    <div className="estimated-time-input">
      <label htmlFor="estimated-time">Estimated Time <span className="required">*</span></label>
      <select
        id="estimated-time"
        value={estTime}
        onChange={handleChange}
        className="select-input"
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
