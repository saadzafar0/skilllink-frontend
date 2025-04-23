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
    <div className="mt-8">
      {!freelancerID ? (
        <div className="text-center p-6 border border-[#1abc9c55] rounded-lg bg-[#1a1a1a]">
          <p className="text-[#1abc9c] font-medium">Please log in to submit a proposal for this job</p>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="space-y-6 border border-[#1abc9c55] rounded-lg p-8 bg-[#1a1a1a] shadow-lg"
        >
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-[#1abc9c]">Send Proposal</h3>
            <p className="text-[#c1faff] text-sm">Fill in the details below to submit your proposal</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[#1abc9c] font-medium">
                Bid Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c1faff]">$</span>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                  min="1"
                  placeholder="Enter your bid amount"
                  className="w-full pl-8 pr-4 py-3 bg-[#2c3e50] border border-[#1abc9c55] rounded-lg text-[#c1faff] focus:outline-none focus:border-[#1abc9c] focus:ring-1 focus:ring-[#1abc9c] transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[#1abc9c] font-medium">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="6"
                required
                placeholder="Introduce yourself and explain why you're a good fit for this job..."
                className="w-full px-4 py-3 bg-[#2c3e50] border border-[#1abc9c55] rounded-lg text-[#c1faff] focus:outline-none focus:border-[#1abc9c] focus:ring-1 focus:ring-[#1abc9c] transition-all duration-300 resize-y"
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              messageType === "success" 
                ? "bg-[#1abc9c22] text-[#1abc9c] border border-[#1abc9c55]" 
                : "bg-[#e74c3c22] text-[#e74c3c] border border-[#e74c3c55]"
            }`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-6 bg-[#1abc9c] text-white rounded-lg font-medium hover:bg-[#16a085] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Proposal"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default SendProposal;