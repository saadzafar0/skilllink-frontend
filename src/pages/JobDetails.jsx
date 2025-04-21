import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobTitle from "../components/jobDetails/JobTitle";
import ClientInfo from "../components/jobDetails/ClientInfo";
import JobDescription from "../components/jobDetails/JobDescription";
import JobDetailsInfo from "../components/jobDetails/JobDetailsInfo";
import SkillsList from "../components/jobDetails/SkillsList";
import SendProposal from "../components/jobDetails/SendProposals";

const JobDetails = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/jobs/${jobId}`);
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Server responded with: ${errText}`);
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-[#0a141e] text-white font-[Segoe UI] max-w-3xl mx-auto p-8 rounded-[10px]">
      <h1 className="text-3xl mb-4 text-[#04ffcd] font-semibold">{jobDetails.title}</h1>
      
      <div className="mb-6">
        <h2 className="text-[#1abc9c] text-xl font-bold">{jobDetails.companyName}</h2>
        <p className="my-2">Rating: {jobDetails.rating}</p>
        <p className="my-2">Qualification: {jobDetails.qualification}</p>
      </div>

      <div className="mb-6">
        <p className="leading-relaxed">{jobDetails.description}</p>
      </div>

      <div className="mb-6">
        <p className="my-2">Job Level: {jobDetails.jobLevel}</p>
        <p className="my-2">Estimated Time: {jobDetails.estTime}</p>
        <p className="my-2">Connects Required: {jobDetails.connectsRequired}</p>
        <p className="my-2">Posted On: {jobDetails.postedOn}</p>
      </div>

      <div className="mb-6">
        <ul className="list-none p-0">
          {jobDetails.targetSkills?.split(",").map((skill, idx) => (
            <li key={idx} className="bg-[#34495e] my-2 p-2 rounded-md">
              {skill.trim()}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#16a085] p-6 mt-8 rounded-lg">
        <label className="block mb-2 font-bold" htmlFor="proposal">Proposal</label>
        <input
          id="proposal"
          className="w-full p-2 mb-4 rounded border-none"
          placeholder="Your Name"
        />
        <textarea
          className="w-full p-2 mb-4 rounded border-none"
          placeholder="Write your proposal here..."
        />
        <button className="bg-[#1abc9c] hover:bg-[#16a085] text-white py-2 px-6 rounded cursor-pointer">
          Submit Proposal
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
