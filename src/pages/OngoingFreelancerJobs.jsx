import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OngoingFreelancerJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.userID) return;

        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/jobs/ongoingfreelancerJobs/${user.userID}`);
                setJobs(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [user]);

    const handleSubmitWork = (jobId, proposalID) => {
        navigate(`/make-submission/${jobId}`, { state: { proposalID } });
    };

    if (loading) return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center">
            <div className="text-red-500 text-xl">{error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">My Ongoing Jobs</h1>
                {jobs.length === 0 ? (
                    <div className="text-[#c1faff] text-center py-8">No ongoing jobs found.</div>
                ) : (
                    <ul className="space-y-6">
                        {jobs.map((job) => (
                            <li key={job.jobID} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                                <h3 className="text-xl font-semibold text-[#1abc9c] mb-4">{job.Title}</h3>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                        {job.level || 'Intermediate'}
                                    </span>
                                    <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                        🔗 {job.connects || 0}
                                    </span>
                                    <span className="px-3 py-1 bg-[#2c3e50] text-[#c1faff] rounded-full text-sm">
                                        {job.pStatus || 'In Progress'}
                                    </span>
                                </div>
                                <p className="text-[#c1faff] mb-6">
                                    {job.skills 
                                        ? job.skills.split(",").join(" • ")
                                        : "No specific skills required"}
                                </p>
                                <div className="flex gap-4">
                                    <button 
                                        className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                                        onClick={() => handleSubmitWork(job.jobID, job.proposalID)}
                                    >
                                        Submit Work
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OngoingFreelancerJobs; 