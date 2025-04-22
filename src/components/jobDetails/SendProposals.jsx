import React, { useState } from "react";
import './SendProposals.css';

const SendProposal = ({ jobid, freelancerID, onSubmit }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"

  // For debugging
  console.log("freelancerID received in SendProposal:", freelancerID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!freelancerID) {
      setMessage("You must be logged in to submit a proposal");
      setMessageType("error");
      return;
    }
    
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      console.log("Submitting proposal with data:", {
        freelancerID,
        jobID: jobid,
        bidAmount,
        coverLetter
      });

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
        }),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Submission failed");
      }

      // Now parse the JSON since we know the response is OK
      const data = await response.json();
      
      setMessage("Proposal submitted successfully!");
      setMessageType("success");
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        // Make sure data contains proposalID before trying to access it
        const proposalID = data && data.proposalID ? data.proposalID : null;
        onSubmit({ bidAmount, coverLetter, proposalID });
      }

      // Reset form
      setBidAmount("");
      setCoverLetter("");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setMessageType("error");
      console.error("Proposal submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-proposal-container">
      {!freelancerID ? (
        <div className="login-required-message">
          <p>Please log in to submit a proposal for this job</p>
        </div>
      ) : (
        <form className="send-proposal" onSubmit={handleSubmit}>
          <h3>Send Proposal</h3>
          <label>
            Bid Amount ($):
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min="1"
            />
          </label>
          <label>
            Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="4"
              required
              placeholder="Introduce yourself and explain why you're a good fit for this job..."
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
          {message && (
            <p className={`submission-message ${messageType}`}>{message}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default SendProposal;