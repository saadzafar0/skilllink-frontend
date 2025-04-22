//SendProposals.jsx
import React, { useState } from "react";
import "./SendProposals.css"; 
const SendProposal = ({ onSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bidAmount, coverLetter });
  };

  return (
    <form className="send-proposal" onSubmit={handleSubmit}>
      <h3>Send Proposal</h3>
      <label>
        Bid Amount ($):
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Cover Letter:
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows="4"
          required
        />
      </label>
      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default SendProposal;
