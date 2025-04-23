import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AddFunds = () => {
    const { user } = useAuth();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            setMessage('Please enter a valid amount');
            setMessageType('error');
            return;
        }

        setLoading(true);
        try {
            // Dummy API endpoint
            const response = await axios.post('http://localhost:4000/api/v1/client/add-funds', {
                clientID: user.userID,
                amount: parseFloat(amount)
            });

            setMessage('Funds added successfully!');
            setMessageType('success');
            setAmount('');
        } catch (error) {
            setMessage('Failed to add funds. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.accType.toLowerCase() !== 'client') {
        return (
            <div className="min-h-screen bg-[#111] flex items-center justify-center">
                <div className="text-red-500 text-xl">Access denied. This page is for clients only.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] shadow-lg">
                    <h1 className="text-2xl font-bold text-[#1abc9c] mb-6">Add Funds to Your Account</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[#1abc9c] font-medium">
                                Amount ($)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c1faff]">$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="w-full pl-8 pr-4 py-3 bg-[#2c3e50] border border-[#1abc9c55] rounded-lg text-[#c1faff] focus:outline-none focus:border-[#1abc9c] focus:ring-1 focus:ring-[#1abc9c] transition-all duration-300"
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg ${
                                messageType === "success" 
                                    ? "bg-[#1abc9c22] text-[#1abc9c] border border-[#1abc9c55]" 
                                    : "bg-[#e74c3c22] text-[#e74c3c] border border-[#e74c3c55]"
                            }`}>
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 px-6 bg-[#1abc9c] text-white rounded-lg font-medium hover:bg-[#16a085] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Add Funds"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFunds; 