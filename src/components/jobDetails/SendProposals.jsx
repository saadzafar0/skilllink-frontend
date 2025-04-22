import React, { useState } from "react";
import "./SendProposals.css";

const SendProposal = ({ jobid, freelancerID, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!freelancerID) {
      setMessage("Error: You must be logged in to submit a proposal");
      return;
    }
    
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/v1/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          freelancerID: parseInt(freelancerID),
          jobID: parseInt(jobid),
          bidAmount: parseInt(bidAmount),
          coverLetter
          // Removed pStatus as it's not handled in the backend
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed");

      setMessage("Proposal submitted successfully!");
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit({ bidAmount, coverLetter, proposalID: data.proposalID });
      }

      // Reset form
      setBidAmount("");
      setCoverLetter("");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Proposal"}
      </button>
      {message && <p className="submission-message">{message}</p>}
    </form>
  );
};

export default SendProposal;