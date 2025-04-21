import React from "react";

const JobDetailsInfo = ({ jobLevel, estTime, connectsRequired, postedOn }) => (
  <div className="bg-zinc-800 p-5 rounded-lg mb-5">
    <p className="text-base text-cyan-100">
      <strong className="font-bold">Level:</strong> {jobLevel}
    </p>
    <p className="text-base text-cyan-100">
      <strong className="font-bold">Estimated Time:</strong> {estTime}
    </p>
    <p className="text-base text-cyan-100">
      <strong className="font-bold">Connects Required:</strong> {connectsRequired}
    </p>
    <p className="text-base text-cyan-100">
      <strong className="font-bold">Posted On:</strong> {new Date(postedOn).toLocaleDateString()}
    </p>
  </div>
);

export default JobDetailsInfo;
