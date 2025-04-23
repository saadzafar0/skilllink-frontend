import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user } = useAuth();
    const [freelancerDetails, setFreelancerDetails] = useState(null);
    const [clientDetails, setClientDetails] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        if (user && user.accType) {
            const accType = user.accType.toLowerCase();
            
            if (accType === 'client') {
                try {
                    const response = await axios.get(`http://localhost:4000/api/v1/Client/${user.userID}`);
                    setClientDetails(response.data);
                } catch (error) {
                    setError(error.message);
                }
            } else if (accType === 'freelancer') {
                try {
                    const [freelancerResponse, connectsResponse] = await Promise.all([
                        axios.get(`http://localhost:4000/api/v1/freelancer/${user.userID}`),
                        axios.get(`http://localhost:4000/api/v1/freelancer/totalConnects/${user.userID}`)
                    ]);
                    
                    setFreelancerDetails({
                        ...freelancerResponse.data,
                        connects: connectsResponse.data.totalConnects || 0
                    });
                } catch (error) {
                    setError(error.message);
                }
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [user]);

    const refreshUserDetails = () => {
        fetchUserDetails();
    };

    return (
        <UserContext.Provider value={{ 
            freelancerDetails, 
            clientDetails, 
            error,
            refreshUserDetails
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 