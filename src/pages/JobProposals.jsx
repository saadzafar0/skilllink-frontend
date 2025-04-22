import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const handleReject = async (proposalID) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/proposals/${proposalID}`);
      alert(`Proposal ${proposalID} rejected`);
    } catch (error) {
      console.error("Error rejecting proposal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1abc9c] mb-8">Proposals for Job ID: {jobId}</h2>

        {proposals.length > 0 ? (
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <div key={proposal.proposalID} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                <div className="space-y-4">
                  <p className="text-[#1abc9c]">
                    <span className="font-semibold">Freelancer ID:</span> {proposal.freelancerID}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Cover Letter:</span> {proposal.coverLetter}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Bid Amount:</span> ${proposal.bidAmount}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Status:</span> {proposal.pStatus}
                  </p>
                  <p className="text-[#c1faff]">
                    <span className="font-semibold text-[#1abc9c]">Submitted On:</span> {new Date(proposal.submittedOn).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleAccept(proposal.proposalID)}
                    className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(proposal.proposalID)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#c1faff] text-center py-8">No proposals found for this job.</p>
        )}
      </div>
    </div>
  );
};

export default JobProposals;
