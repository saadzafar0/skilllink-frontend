import React, { useState } from "react";

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
    <div className="mt-5">
      {!freelancerID ? (
        <div className="text-center p-5 border border-[#e0e0e0] rounded-lg bg-[#f9f9f9] mt-5">
          <p className="text-[#721c24] font-medium">Please log in to submit a proposal for this job</p>
        </div>
      ) : (
        <form className="flex flex-col gap-4 mt-5 border border-[#e0e0e0] rounded-lg p-5 bg-[#f9f9f9]" onSubmit={handleSubmit}>
          <h3 className="mt-0 text-[#333]">Send Proposal</h3>
          <label className="flex flex-col gap-1.5 font-medium">
            Bid Amount ($):
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min="1"
              className="p-2.5 border border-[#ddd] rounded font-normal text-sm"
            />
          </label>
          <label className="flex flex-col gap-1.5 font-medium">
            Cover Letter:
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="4"
              required
              placeholder="Introduce yourself and explain why you're a good fit for this job..."
              className="p-2.5 border border-[#ddd] rounded font-normal text-sm min-h-[100px] resize-y"
            />
          </label>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#0070f3] text-white rounded px-4 py-2.5 text-base cursor-pointer transition-colors duration-200 self-start hover:bg-[#0051a8] disabled:bg-[#a3c0e6] disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
          {message && (
            <p className={`mt-2.5 p-2.5 rounded ${
              messageType === "success" 
                ? "bg-[#d4edda] text-[#155724] border border-[#c3e6cb]" 
                : "bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb]"
            }`}>
              {message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default SendProposal;