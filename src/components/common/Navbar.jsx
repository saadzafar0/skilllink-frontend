import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [freelancerDetails, setFreelancerDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.accType) {
        const accType = user.accType.toLowerCase();
        
        if (accType === 'client') {
          try {
            const response = await axios.get(`http://localhost:4000/api/v1/Client/${user.userID}`);
            
            if (response.data && (response.data.amount !== undefined || response.data.spent !== undefined)) {
              setClientDetails(response.data);
            } else {
              setError("Invalid client data received");
            }
          } catch (error) {
            setError(error.message);
            
            // Try alternative endpoint if the first one fails
            try {
              const altResponse = await axios.get(`http://localhost:4000/api/v1/client/${user.userID}`);
              setClientDetails(altResponse.data);
            } catch (altError) {
              // Silently fail on second attempt
            }
          }
        } else if (accType === 'freelancer') {
          try {
            const response = await axios.get(`http://localhost:4000/api/v1/freelancer/${user.userID}`);
            
            if (response.data && (response.data.amount !== undefined || response.data.earned !== undefined)) {
              setFreelancerDetails(response.data);
            } else {
              setError("Invalid freelancer data received");
            }
          } catch (error) {
            setError(error.message);
          }
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-black px-6 py-3 flex justify-between items-center border-b-2 border-[#1abc9c] relative z-10">
      <div className="flex items-center gap-2.5">
        <img src="./logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-[#1abc9c] text-2xl font-bold m-0">SkillLink</h1>
      </div>

      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex md:items-center gap-5 m-0 p-0 list-none absolute md:relative top-16 md:top-0 right-0 bg-[#111] md:bg-transparent flex-col md:flex-row w-48 md:w-auto p-5 md:p-0 rounded-lg md:rounded-none`}>
        <li><Link to="/" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Home</Link></li>
        <li><Link to="/dashboard" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Dashboard</Link></li>
        {user && user.accType && user.accType.toLowerCase() === 'client' && (
          <li className="flex flex-col md:flex-row gap-4 md:gap-6 items-center p-2 md:p-4 bg-[#1a1f2b] rounded-lg border border-[#1abc9c55]">
            {clientDetails ? (
              <>
                <span className="flex items-center gap-2 text-[#1abc9c] text-sm font-semibold">
                  <span className="before:content-['💰']">Balance: ${clientDetails.amount || 0}</span>
                </span>
                <span className="flex items-center gap-2 text-[#1abc9c] text-sm font-semibold">
                  <span className="before:content-['💸']">Spent: ${clientDetails.spent || 0}</span>
                </span>
              </>
            ) : (
              <span className="text-[#f1c40f] text-sm italic">Loading client details...</span>
            )}
            {error && <span className="text-[#e74c3c] text-sm font-semibold">Error: {error}</span>}
          </li>
        )}
        {user && user.accType && user.accType.toLowerCase() === 'freelancer' && (
          <li className="flex flex-col md:flex-row gap-4 md:gap-6 items-center p-2 md:p-4 bg-[#1a1f2b] rounded-lg border border-[#1abc9c55]">
            {freelancerDetails ? (
              <>
                <span className="flex items-center gap-2 text-[#1abc9c] text-sm font-semibold">
                  <span className="before:content-['💰']">Balance: ${freelancerDetails.amount || 0}</span>
                </span>
                <span className="flex items-center gap-2 text-[#1abc9c] text-sm font-semibold">
                  <span className="before:content-['💵']">Earned: ${freelancerDetails.earned || 0}</span>
                </span>
              </>
            ) : (
              <span className="text-[#f1c40f] text-sm italic">Loading freelancer details...</span>
            )}
            {error && <span className="text-[#e74c3c] text-sm font-semibold">Error: {error}</span>}
          </li>
        )}
        {user ? (
          <li className="relative">
            <button onClick={toggleDropdown} className="bg-[#1abc9c] text-black px-3.5 py-2 rounded-lg font-medium hover:bg-[#16a085] transition-colors duration-300">
              Profile ▾
            </button>
            {isDropdownOpen && (
              <div className="absolute top-16 right-0 bg-[#222] p-3 rounded-xl shadow-lg flex flex-col min-w-[160px]">
                <span className="text-[#eee] text-sm mb-2">{user.name}</span>
                <span className="text-[#eee] text-sm mb-2">{user.accType}</span>
                <button className="px-2.5 py-1.5 bg-[#1abc9c] text-black font-semibold rounded-lg hover:bg-[#16a085] transition-colors duration-300" onClick={logout}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Login</Link></li>
            <li><Link to="/register" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Register</Link></li>
          </>
        )}
      </ul>

      <div onClick={toggleMenu} className="block md:hidden text-3xl text-[#1abc9c] cursor-pointer">
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
