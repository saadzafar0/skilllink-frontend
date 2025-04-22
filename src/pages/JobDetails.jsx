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

import "../styles/JobDetails.css";

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
    return <div>Loading...</div>;
  }

  // Log the user information for debugging
  console.log("Current user in JobDetails:", user);

  const handleProposalSubmit = (proposalData) => {
    console.log("Proposal submitted:", proposalData);
    // Handle any post-submission logic here
  };

  return (
    <div className="job-details-container">
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
      
      <SendProposal
        jobid={jobID}
        freelancerID={user ? user.userID : null} // Changed from user.id to user.userID
        onSubmit={handleProposalSubmit}
      />
    </div>
  );
};

export default JobDetails;