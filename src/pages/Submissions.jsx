import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Submissions = () => {
    const { jobId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/submissions/job/${jobId}`);
                setSubmissions(response.data);
            } catch (err) {
                console.error('Error fetching submissions:', err);
                setError('Failed to fetch submissions');
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [jobId]);

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
                <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">Submissions for Job #{jobId}</h1>
                {submissions.length === 0 ? (
                    <div className="text-[#c1faff] text-center py-8">No submissions found for this job.</div>
                ) : (
                    <div className="space-y-6">
                        {submissions.map((submission) => (
                            <div key={submission.submissionID} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#1abc9c]">
                                            Submission #{submission.submissionID}
                                        </h3>
                                        <p className="text-[#c1faff] text-sm">
                                            Submitted by: {submission.freelancerName} (Freelancer #{submission.freelancerID})
                                        </p>
                                        <p className="text-[#c1faff] text-sm">
                                            Submitted on: {new Date(submission.submissionDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-[#c1faff] text-sm">
                                            Bid Amount: ${submission.bidAmount}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#2c3e50] p-4 rounded-lg">
                                    <p className="text-[#c1faff] whitespace-pre-wrap">{submission.submissionText}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Submissions;
