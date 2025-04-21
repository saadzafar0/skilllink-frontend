import React from "react";

const ClientInfo = ({ companyName, rating, qualification }) => (
  <div className="bg-zinc-800 p-5 rounded-lg mb-5">
    <h2 className="text-xl text-cyan-300 font-semibold">{companyName}</h2>
    <p className="text-base text-cyan-100 mt-2">Rating: {rating} ★</p>
    <p className="text-base text-cyan-100">Qualification: {qualification}</p>
  </div>
);

export default ClientInfo;
