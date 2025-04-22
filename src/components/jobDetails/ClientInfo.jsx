//ClientInfo.jsx
import React from "react";

const ClientInfo = ({ companyName, rating, qualification }) => (
  <div className="bg-[#303030] p-5 rounded-lg mb-5">
    <h2 className="text-2xl text-[#47f9ff]">{companyName}</h2>
    <p className="text-base text-[#c1faff]">Rating: {rating} ★</p>
    <p className="text-base text-[#c1faff]">Qualification: {qualification}</p>
  </div>
);

export default ClientInfo;
