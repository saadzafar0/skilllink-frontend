import React, { useEffect, useState } from "react";
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
              if (Array.isArray(props)) {
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

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <div className="text-red-500 text-xl">Please log in to view proposals.</div>
    </div>
  );
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1abc9c] mb-8">Your Proposals</h2>
        {proposals.length === 0 ? (
          <p className="text-[#c1faff] text-center py-8">No proposals found.</p>
        ) : (
          <div className="space-y-6">
            {proposals.map((p) => (
              <div key={p.proposalID} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                <div className="space-y-4">
                  <p className="text-[#1abc9c]">
                    <span className="font-semibold">Job ID:</span> {p.jobID}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Bid Amount:</span> ${p.bidAmount}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Status:</span> {p.pStatus}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Submitted On:</span> {new Date(p.submittedOn).toLocaleDateString()}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Cover Letter:</span> {p.coverLetter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;