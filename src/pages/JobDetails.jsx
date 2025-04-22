import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ← Add this
import JobTitle from "../components/jobDetails/JobTitle";
import ClientInfo from "../components/jobDetails/ClientInfo";
import JobDescription from "../components/jobDetails/JobDescription";
import JobDetailsInfo from "../components/jobDetails/JobDetailsInfo";
import SkillsList from "../components/jobDetails/SkillsList";
import SendProposal from "../components/jobDetails/SendProposals";
import { useAuth } from "../context/AuthContext";

import "../styles/JobDetails.css";

const JobDetails = () => {
  const {user : currentUser} = useAuth()

  const { jobId } = useParams(); // ← Get jobId from the route
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    console.log("Fetching job details for jobId:", jobId);
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/jobs/${jobId}`
        );
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
    return <div>Loading...</div>;
  }

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
      <SkillsList skills={jobDetails.targetSkills?.split(",")} />
      
      <SendProposal
        jobid={jobId}
        freelancerID={currentUser} // Replace with actual logged-in freelancer ID
      />

    </div>
  );
};

export default JobDetails;
