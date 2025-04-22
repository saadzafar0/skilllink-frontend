// JobDetailsInfo.jsx
import React from "react";

const JobDetailsInfo = ({ jobLevel, estTime, connectsRequired, postedOn }) => (
  <div className="bg-[#303030] p-5 rounded-lg mb-5">
    <p className="text-base text-[#c1faff]"><strong>Level:</strong> {jobLevel}</p>
    <p className="text-base text-[#c1faff]"><strong>Estimated Time:</strong> {estTime}</p>
    <p className="text-base text-[#c1faff]"><strong>Connects Required:</strong> {connectsRequired}</p>
    <p className="text-base text-[#c1faff]"><strong>Posted On:</strong> {new Date(postedOn).toLocaleDateString()}</p>
  </div>
);

export default JobDetailsInfo;
