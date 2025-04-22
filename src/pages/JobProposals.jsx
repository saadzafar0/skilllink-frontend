import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/JobProposals.css"; 

const JobProposals = () => {
  const { jobId } = useParams();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/proposals/job/${jobId}`
        );
        setProposals(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchProposals();
  }, [jobId]);

  const handleAccept = async (proposalID) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/proposals/accept/${proposalID}`);
      alert(`Proposal ${proposalID} accepted`);
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const handleReject = async (proposalID) => {1
    try {
      await axios.delete(`http://localhost:4000/api/v1/proposals/${proposalID}`);
      alert(`Proposal ${proposalID} rejected`);
    } catch (error) {
      console.error("Error rejecting proposal:", error);
    }
  };

  return (
    <div className="job-proposals-container">
      <h2 className="job-proposals-title">Proposals for Job ID: {jobId}</h2>

      {proposals.length > 0 ? (
        <div className="proposals-list">
          {proposals.map((proposal) => (
            <div key={proposal.proposalID} className="proposal-card">
              <p>
                <span className="proposal-label">Freelancer ID:</span> {proposal.freelancerID}
              </p>
              <p>
                <span className="proposal-label">Cover Letter:</span> {proposal.coverLetter}
              </p>
              <p>
                <span className="proposal-label">Bid Amount:</span> {proposal.bidAmount}
              </p>
              <p>
                <span className="proposal-label">Status:</span> {proposal.pStatus}
              </p>
              <p>
                <span className="proposal-label">Submitted On:</span> {new Date(proposal.submittedOn).toLocaleDateString()}
              </p>
              <div className="proposal-buttons">
                <button className="accept-btn" onClick={() => handleAccept(proposal.proposalID)}>
                  Accept
                </button>
                <button className="reject-btn" onClick={() => handleReject(proposal.proposalID)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-proposals">No proposals found for this job.</p>
      )}
    </div>
  );
};

export default JobProposals;
