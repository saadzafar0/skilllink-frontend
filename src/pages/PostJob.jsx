import React, { useState } from "react";
import "../styles/PostJob.css";
import JobTitleInput from "../components/postJob/JobTitleInput";
import JobDescriptionInput from "../components/postJob/JobDescriptionInput";
import SkillTags from "../components/postJob/RequiredSkillsInput";
import EstimatedTimeInput from "../components/postJob/EstimatedTimeInput";
import JobLevelSelect from "../components/postJob/JobLevelSelect";
import ConnectsInput from "../components/postJob/ConnectsRequiredInput";
import { useAuth } from '../context/AuthContext';
import axios from "axios";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetSkills, setTargetSkills] = useState([]);
  const [estTime, setEstTime] = useState("1 week");
  const [jobLevel, setJobLevel] = useState("Beginner");
  const [connectsRequired, setConnectsRequired] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");
  const { user } = useAuth();   

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with actual userID of the logged-in client (you might fetch it from context or localStorage)
    const userID = localStorage.getItem("userID");

    if (!user || !user.userID) {
      setStatusMessage("You must be logged in to post a job.");
      return;
    }

    const jobData = {
      title,
      description,
      targetSkills: targetSkills.join(", "), // Convert array to string
      estTime,
      jobLevel,
      connectsRequired,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/v1/jobs", jobData, {
        headers: {
          "user-id": user.userID, // Add userID to headers
        },
      });
      setStatusMessage("Job posted successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setTargetSkills([]);
      setEstTime("1 week");
      setJobLevel("Beginner");
      setConnectsRequired(1);
    } catch (error) {
      console.error("Error posting job:", error);
      setStatusMessage("Failed to post job. Try again.");
    }
  };

  return (
    <div className="post-job-container">
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit} className="post-job-form">
        <JobTitleInput title={title} setTitle={setTitle} />
        <JobDescriptionInput
          description={description}
          setDescription={setDescription}
        />
        <SkillTags
          targetSkills={targetSkills}
          setTargetSkills={setTargetSkills}
        />
        <EstimatedTimeInput estTime={estTime} setEstTime={setEstTime} />
        <JobLevelSelect jobLevel={jobLevel} setJobLevel={setJobLevel} />
        <ConnectsInput
          connectsRequired={connectsRequired}
          setConnectsRequired={setConnectsRequired}
        />
        <button type="submit" className="submit-btn">
          Post Job
        </button>
        {statusMessage && <p className="status-msg">{statusMessage}</p>}
      </form>
    </div>
  );
};

export default PostJob;
