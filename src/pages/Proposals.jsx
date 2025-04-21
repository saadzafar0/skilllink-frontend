import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Proposals.css";

const Proposals = ({ user }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProposals = async () => {
    try {
      let res;
      if (user.accType === "freelancer") {
        res = await axios.get(`/api/proposals/freelancer/${user.userID}`);
      } else if (user.accType === "client") {
        // Get client's jobs
        const jobsRes = await axios.get(`/api/jobs/client/${user.userID}`);
        const jobIDs = jobsRes.data.map((job) => job.jobID);

        const allProposals = [];
        for (const jobID of jobIDs) {
          const propRes = await axios.get(`/api/proposals/job/${jobID}`);
          allProposals.push(...propRes.data);
        }
        res = { data: allProposals };
      }
      setProposals(res.data);
    } catch (error) {
      console.error("Failed to fetch proposals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  if (loading) return <div className="loading">Loading proposals...</div>;

  return (
    <div className="proposals-container">
      <h2>Your Proposals</h2>
      {proposals.length === 0 ? (
        <p className="no-proposals">No proposals found.</p>
      ) : (
        <div className="proposal-list">
          {proposals.map((p) => (
            <div key={p.proposalID} className="proposal-card">
              <p><strong>Job ID:</strong> {p.jobID}</p>
              <p><strong>Bid:</strong> ${p.bidAmount}</p>
              <p><strong>Status:</strong> {p.pStatus}</p>
              <p><strong>Submitted:</strong> {new Date(p.submittedOn).toLocaleDateString()}</p>
              <p><strong>Cover Letter:</strong> {p.coverLetter}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;