import React, { useState } from "react";

const SendProposal = ({ onSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bidAmount, coverLetter });
  };

  return (
    <form className="bg-gray-800 p-5 rounded-lg mt-5" onSubmit={handleSubmit}>
      <h3 className="text-xl text-cyan-300 mb-5">Send Proposal</h3>
      <label className="block text-sm text-cyan-100 mb-2">
        Bid Amount ($):
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </label>
      <label className="block text-sm text-cyan-100 mb-2">
        Cover Letter:
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows="4"
          required
          className="w-full p-2 mt-1 border border-gray-300 rounded-md"
        />
      </label>
      <button
        type="submit"
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit Proposal
      </button>
    </form>
  );
};

export default SendProposal;
