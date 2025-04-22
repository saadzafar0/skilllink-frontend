// JobDescription.jsx
import React from "react";

const JobDescription = ({ description }) => (
  <div className="bg-[#303030] p-5 rounded-lg mb-5">
    <h3 className="text-2xl text-[#47f9ff]">Description</h3>
    <p className="text-base text-[#c1faff]">{description}</p>
  </div>
);

export default JobDescription;
