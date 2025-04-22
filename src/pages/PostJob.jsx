import React, { useState } from "react";
import JobTitleInput from "../components/postJob/JobTitleInput";
import JobDescriptionInput from "../components/postJob/JobDescriptionInput";
import SkillTags from "../components/postJob/RequiredSkillsInput";
import EstimatedTimeInput from "../components/postJob/EstimatedTimeInput";
import JobLevelSelect from "../components/postJob/JobLevelSelect";
import ConnectsInput from "../components/postJob/ConnectsRequiredInput";
import PriceInput from "../components/postJob/PriceInput";
import { useAuth } from '../context/AuthContext';
import axios from "axios";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetSkills, setTargetSkills] = useState([]);
  const [estTime, setEstTime] = useState("1 week");
  const [jobLevel, setJobLevel] = useState("Beginner");
  const [connectsRequired, setConnectsRequired] = useState(1);
  const [price, setPrice] = useState(100);
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
      price,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/v1/jobs", jobData, {
        headers: {
          "user-id": user.userID,
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
      setPrice(100);
    } catch (error) {
      console.error("Error posting job:", error);
      setStatusMessage("Failed to post job. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] p-8 rounded-xl shadow-2xl">
          <JobTitleInput title={title} setTitle={setTitle} />
          <JobDescriptionInput description={description} setDescription={setDescription} />
          <SkillTags targetSkills={targetSkills} setTargetSkills={setTargetSkills} />
          <EstimatedTimeInput estTime={estTime} setEstTime={setEstTime} />
          <JobLevelSelect jobLevel={jobLevel} setJobLevel={setJobLevel} />
          <ConnectsInput connectsRequired={connectsRequired} setConnectsRequired={setConnectsRequired} />
          <PriceInput price={price} setPrice={setPrice} />
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-[#1abc9c] text-white rounded-lg font-semibold hover:bg-[#16a085] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1abc9c] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
          >
            Post Job
          </button>
          {statusMessage && (
            <p className={`text-center ${statusMessage.includes("successfully") ? "text-[#1abc9c]" : "text-red-500"}`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
