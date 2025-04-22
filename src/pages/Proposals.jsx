import React, { useEffect, useState } from "react";
import "../styles/Proposals.css";
import { useAuth } from "../context/AuthContext";

const Proposals = () => {
  const {user} = useAuth(); 
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      console.log(">>> fetchProposals running with user:", user);
  
      try {
        if (!user) {
          console.warn("No user, skipping proposal fetch");
          setLoading(false);
          return;
        }
  
        let response;
        if (user.accType === "Freelancer") {
          response = await fetch(`http://localhost:4000/api/v1/proposals/freelancer/${user.userID}`);
          const data = await response.json();
          setProposals(data);
        } else if (user.accType === "Client") {
          const jobsRes = await fetch(`http://localhost:4000/api/v1/jobs/client/${user.userID}`);
          const jobs = await jobsRes.json();
          const jobIDs = jobs.map((job) => job.jobID);
          console.log("Fetched jobs for client:", jobs);
          const allProposals = [];
          for (const jobID of jobIDs) {
            try {
              const propRes = await fetch(`http://localhost:4000/api/v1/proposals/job/${jobID}`);
              if (!propRes.ok) throw new Error(`Failed to fetch proposals for job ${jobID}`);
              const props = await propRes.json();
              if (Array.isArray(props)) { // Ensure props is an array
                allProposals.push(...props);
              }
            } catch (error) {
              console.error(`Error fetching proposals for job ${jobID}:`, error);
            }
          }
          setProposals(allProposals);
        }
      } catch (error) {
        console.error("Failed to fetch proposals", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      console.log("Inside useEffect, user is:", user);
      fetchProposals();
    }
  }, [user]);  

  if (!user) return <div className="error">Please log in to view proposals.</div>;
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