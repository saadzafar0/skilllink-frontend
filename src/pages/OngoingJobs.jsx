import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OngoingJobs.css'; 
import { useAuth } from "../context/AuthContext";

const OngoingJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.userID) return;

        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/jobs/ongoing/${user.userID}`);
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

    const handleMarkComplete = async (jobId) => {
        try {
            await axios.post(`http://localhost:4000/api/v1/jobs/${jobId}/complete`);
            // Refresh the jobs list
            const response = await axios.get(`http://localhost:4000/api/v1/jobs/ongoing/${user.userID}`);
            setJobs(response.data);
        } catch (err) {
            console.error('Failed to mark job as complete:', err);
        }
    };

    const handleCheckSubmissions = (jobId) => {
        // Navigate to submissions page or open modal
        window.location.href = `/submissions/${jobId}`;
    };

    if (loading) return <div className="loading-container">Loading...</div>;
    if (error) return <div className="error-container">{error}</div>;

    return (
        <div className="ongoing-jobs-container">
            <h1 className="ongoing-jobs-title">Ongoing Jobs</h1>
            {jobs.length === 0 ? (
                <div className="no-jobs-message">No ongoing jobs found.</div>
            ) : (
                <ul className="ongoing-jobs-list">
                    {jobs.map((job) => (
                        <li key={job.jobID} className="job-card">
                            <h3>{job.Title}</h3>
                            <div className="job-meta">
                                <span className="job-level">{job.level || 'Intermediate'}</span>
                                <span className="job-connects">🔗 {job.connects || 0}</span>
                                <span className="job-status">{job.pStatus || 'In Progress'}</span>
                            </div>
                            <p className="job-skills">
                                {job.skills 
                                    ? job.skills.split(",").join(" • ")
                                    : "No specific skills required"}
                            </p>
                            <div className="job-actions">
                                <button 
                                    className="complete-btn"
                                    onClick={() => handleMarkComplete(job.jobID)}
                                >
                                    Mark Complete
                                </button>
                                <button 
                                    className="submissions-btn"
                                    onClick={() => handleCheckSubmissions(job.jobID)}
                                >
                                    Check Submissions
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OngoingJobs;
