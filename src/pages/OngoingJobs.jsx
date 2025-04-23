import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OngoingJobs = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.userID) return;

        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/jobs/ongoing/${user.userID}`);
                setJobs(response.data || []);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [user]);

    const handleMarkComplete = async (jobId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/jobs/complete/${jobId}`);
            // Refresh the jobs list
            const response = await axios.get(`http://localhost:4000/api/v1/jobs/ongoing/${user.userID}`);
            setJobs(response.data);
        } catch (err) {
            console.error('Failed to mark job as complete:', err);
        }
    };

    const handleViewSubmissions = (jobId) => {
        // Clean the jobId by taking the first part if it contains a comma
        const cleanJobId = jobId.toString().split(',')[0];
        navigate(`/submissions/${cleanJobId}`);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1abc9c]"></div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-4">
            <div className="text-red-500 text-xl">{error}</div>
            <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">Ongoing Jobs</h1>
                {jobs.length === 0 ? (
                    <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] shadow-lg text-center">
                        <div className="text-[#1abc9c] text-2xl mb-4">No Ongoing Jobs</div>
                        <p className="text-[#c1faff] mb-6">You don't have any ongoing jobs at the moment.</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => navigate('/active-jobs')}
                                className="px-4 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors duration-300"
                            >
                                View Active Jobs
                            </button>
                            <button 
                                onClick={() => navigate('/post-job')}
                                className="px-4 py-2 bg-[#3498db] text-white rounded-lg hover:bg-[#2980b9] transition-colors duration-300"
                            >
                                Post New Job
                            </button>
                        </div>
                    </div>
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
                                        onClick={() => handleMarkComplete(job.jobID)}
                                    >
                                        Mark Complete
                                    </button>
                                    <button 
                                        className="px-4 py-2 bg-[#3498db] text-white rounded-lg hover:bg-[#2980b9] transition-colors duration-300"
                                        onClick={() => handleViewSubmissions(job.jobID)}
                                    >
                                        View Submissions
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

export default OngoingJobs;
