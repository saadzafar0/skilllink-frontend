import React from "react";

const JobDescription = ({ description }) => (
  <div className="bg-zinc-800 p-5 rounded-lg mb-5">
    <h3 className="text-xl text-cyan-300 font-semibold mb-2">Description</h3>
    <p className="text-base text-cyan-100">{description}</p>
  </div>
);

export default JobDescription;
