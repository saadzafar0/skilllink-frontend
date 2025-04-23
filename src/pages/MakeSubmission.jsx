import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const MakeSubmission = () => {
    const { jobId } = useParams();
    const location = useLocation();
    const { proposalID } = location.state || {};
    const [submissionText, setSubmissionText] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!submissionText.trim()) {
            setError('Please enter your submission text');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/v1/submissions', {
                proposalID,
                submissionText
            });
            
            if (response.status === 201) {
                setStatus('Submission successful!');
                setSubmissionText('');
                setError('');
            }
        } catch (err) {
            console.error('Error submitting work:', err);
            setError('Failed to submit work. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-[#1abc9c] mb-8">Submit Work</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="submissionText" className="block text-[#c1faff] text-lg mb-2">
                            Your Submission
                        </label>
                        <textarea
                            id="submissionText"
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            className="w-full h-64 p-4 bg-[#1a1a1a] text-[#c1faff] rounded-lg border border-[#333] focus:border-[#1abc9c] focus:ring-1 focus:ring-[#1abc9c] transition-colors duration-300"
                            placeholder="Enter your work submission here..."
                        />
                    </div>
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    {status && (
                        <p className="text-[#1abc9c]">{status}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-[#1abc9c] text-white rounded-lg font-semibold hover:bg-[#16a085] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1abc9c] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                    >
                        Submit Work
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeSubmission; 