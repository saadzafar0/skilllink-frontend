import React, { useEffect, useState } from "react";
import axios from "axios";

const Proposals = ({ user }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        let response;

        if (user.accType === "freelancer") {
          response = await axios.get(`/api/proposals/freelancer/${user.userID}`);
        } else if (user.accType === "client") {
          const jobsRes = await axios.get(`/api/jobs/client/${user.userID}`);
          const jobIDs = jobsRes.data.map((job) => job.jobID);

          const allProposals = await Promise.all(
            jobIDs.map((id) => axios.get(`/api/proposals/job/${id}`))
          );

          response = {
            data: allProposals.flatMap((res) => res.data),
          };
        }

        setProposals(response.data);
      } catch (error) {
        console.error("Failed to fetch proposals", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [user]);

  if (loading) {
    return <div className="text-center text-lg text-green-800">Loading proposals...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 bg-green-50 rounded-xl shadow-md font-sans">
      <h2 className="text-center text-green-800 text-2xl font-semibold mb-6">Your Proposals</h2>

      {proposals.length === 0 ? (
        <p className="text-center text-green-700 text-lg py-6">No proposals found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.proposalID}
              className="bg-white border-2 border-green-400 p-4 rounded-lg w-72 hover:bg-green-50 transition-colors"
            >
              <p className="text-green-800 text-sm mb-1">
                <strong>Job ID:</strong> {proposal.jobID}
              </p>
              <p className="text-green-800 text-sm mb-1">
                <strong>Bid:</strong> ${proposal.bidAmount}
              </p>
              <p className="text-green-800 text-sm mb-1">
                <strong>Status:</strong> {proposal.pStatus}
              </p>
              <p className="text-green-800 text-sm mb-1">
                <strong>Submitted:</strong> {new Date(proposal.submittedOn).toLocaleDateString()}
              </p>
              <p className="text-green-800 text-sm">
                <strong>Cover Letter:</strong> {proposal.coverLetter}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposals;
