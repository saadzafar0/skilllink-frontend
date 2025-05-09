import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobTitle from "../components/jobDetails/JobTitle";
import ClientInfo from "../components/jobDetails/ClientInfo";
import JobDescription from "../components/jobDetails/JobDescription";
import JobDetailsInfo from "../components/jobDetails/JobDetailsInfo";
import SkillsList from "../components/jobDetails/SkillsList";
import SendProposal from "../components/jobDetails/SendProposals";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const JobDetails = () => {
  const { user } = useAuth();
  const { jobID } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    console.log("Fetching job details for jobId:", jobID);
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/jobs/${jobID}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (jobID) fetchJobDetails();
  }, [jobID]);

  if (!jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="text-[#1abc9c] text-xl">Loading...</div>
      </div>
    );
  }

  console.log("Current user in JobDetails:", user);

  const handleProposalSubmit = (proposalData) => {
    console.log("Proposal submitted:", proposalData);
  };

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <JobTitle title={jobDetails.title} />
        <ClientInfo
          companyName={jobDetails.companyName}
          rating={jobDetails.rating}
          qualification={jobDetails.qualification}
        />
        <JobDescription description={jobDetails.description} />
        <JobDetailsInfo
          jobLevel={jobDetails.jobLevel}
          estTime={jobDetails.estTime}
          connectsRequired={jobDetails.connectsRequired}
          postedOn={jobDetails.postedOn}
        />
        <SkillsList skills={jobDetails.targetSkills ? jobDetails.targetSkills.split(",") : []} />
        
        {user && user.accType && user.accType.toLowerCase() === 'freelancer' && (
          <SendProposal
            jobid={jobID}
            freelancerID={user.userID}
            onSubmit={handleProposalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default JobDetails;


