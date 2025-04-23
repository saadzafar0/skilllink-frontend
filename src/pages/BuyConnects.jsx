import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const BuyConnects = () => {
    const { user } = useAuth();
    const { refreshUserDetails } = useUser();
    const [quantity, setQuantity] = useState(10); // Set default to first option
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [userBalance, setUserBalance] = useState(0);

    const connectPricing = [
        { quantity: 10, price: 10 },
        { quantity: 25, price: 20 },
        { quantity: 50, price: 35 },
        { quantity: 100, price: 60 }
    ];

    useEffect(() => {
        const fetchUserBalance = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/freelancer/${user.userID}`);
                setUserBalance(response.data.amount || 0);
            } catch (error) {
                setMessage('Failed to fetch user balance');
                setMessageType('error');
            }
        };

        if (user) {
            fetchUserBalance();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        const selectedOption = connectPricing.find(p => p.quantity === quantity);
        if (!selectedOption) {
            setMessage('Please select a valid connect package');
            setMessageType('error');
            setLoading(false);
            return;
        }
        
        if (userBalance < selectedOption.price) {
            setMessage('Insufficient balance to purchase connects');
            setMessageType('error');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/v1/freelancer/buy-connects', {
                freelancerID: user.userID,
                quantity: selectedOption.quantity,
                amount: selectedOption.price
            });

            if (response.data.success) {
                setMessage('Connects purchased successfully!');
                setMessageType('success');
                setQuantity(10); // Reset to default
                // Refresh user details in the context
                await refreshUserDetails();
                // Update local balance
                const updatedBalance = await axios.get(`http://localhost:4000/api/v1/freelancer/${user.userID}`);
                setUserBalance(updatedBalance.data.amount || 0);
            } else {
                throw new Error(response.data.message || 'Failed to purchase connects');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to purchase connects. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.accType.toLowerCase() !== 'freelancer') {
        return (
            <div className="min-h-screen bg-[#111] flex items-center justify-center">
                <div className="text-red-500 text-xl">Access denied. This page is for freelancers only.</div>
            </div>
        );
    }

    const selectedOption = connectPricing.find(p => p.quantity === quantity) || connectPricing[0];

    return (
        <div className="min-h-screen bg-[#111] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333] shadow-lg">
                    <h1 className="text-2xl font-bold text-[#1abc9c] mb-6">Buy Connects</h1>
                    
                    <div className="space-y-6">
                        <div className="bg-[#2c3e50] p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[#c1faff]">Available Balance:</span>
                                <span className="text-[#1abc9c] font-bold">${userBalance}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {connectPricing.map((option) => (
                                <div 
                                    key={option.quantity}
                                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                                        quantity === option.quantity
                                            ? 'border-[#1abc9c] bg-[#1abc9c22]'
                                            : 'border-[#333] hover:border-[#1abc9c55]'
                                    } ${userBalance < option.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => userBalance >= option.price && setQuantity(option.quantity)}
                                >
                                    <div className="text-[#1abc9c] font-bold text-xl">{option.quantity} Connects</div>
                                    <div className="text-[#c1faff]">${option.price}</div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#2c3e50] p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[#c1faff]">Selected Connects:</span>
                                <span className="text-[#1abc9c] font-bold">{selectedOption.quantity}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#c1faff]">Total Price:</span>
                                <span className="text-[#1abc9c] font-bold">
                                    ${selectedOption.price}
                                </span>
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
                            onClick={handleSubmit}
                            disabled={loading || userBalance < selectedOption.price}
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
                                "Purchase Connects"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyConnects; 