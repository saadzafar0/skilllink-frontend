import React, { useState } from "react";
import JobTitleInput from "../components/postJob/JobTitleInput";
import JobDescriptionInput from "../components/postJob/JobDescriptionInput";
import SkillTags from "../components/postJob/RequiredSkillsInput";
import EstimatedTimeInput from "../components/postJob/EstimatedTimeInput";
import JobLevelSelect from "../components/postJob/JobLevelSelect";
import ConnectsInput from "../components/postJob/ConnectsRequiredInput";
import { useAuth } from "../context/AuthContext";
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

    if (!user || !user.userID) {
      setStatusMessage("You must be logged in to post a job.");
      return;
    }

    const jobData = {
      title,
      description,
      targetSkills: targetSkills.join(", "),
      estTime,
      jobLevel,
      connectsRequired,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/v1/jobs", jobData, {
        headers: {
          "user-id": user.userID,
        },
      });
      setStatusMessage("Job posted successfully!");
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
    <div className="bg-[#0a141e] text-white p-6 md:p-12 rounded-xl max-w-4xl mx-auto mt-8 font-sans">
      <h1 className="text-[#04ffcd] text-center text-3xl md:text-4xl font-bold mb-8">Post a Job</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <JobTitleInput title={title} setTitle={setTitle} />
        <JobDescriptionInput description={description} setDescription={setDescription} />
        <SkillTags targetSkills={targetSkills} setTargetSkills={setTargetSkills} />
        <EstimatedTimeInput estTime={estTime} setEstTime={setEstTime} />
        <JobLevelSelect jobLevel={jobLevel} setJobLevel={setJobLevel} />
        <ConnectsInput connectsRequired={connectsRequired} setConnectsRequired={setConnectsRequired} />

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 transition-colors duration-300 text-white py-3 px-6 text-lg rounded-md mt-6"
        >
          Post Job
        </button>
        {statusMessage && <p className="text-sm text-center mt-4">{statusMessage}</p>}
      </form>
    </div>
  );
};

export default PostJob;
