//ClientInfo.jsx
import React from "react";
import "./ClientInfo.css"; 
const ClientInfo = ({ companyName, rating, qualification }) => (
  <div className="client-info">
    <h2>{companyName}</h2>
    <p>Rating: {rating} ★</p>
    <p>Qualification: {qualification}</p>
  </div>
);

export default ClientInfo;
