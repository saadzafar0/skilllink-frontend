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

    fetchUserDetails();
  }, [user]);

  const getUserRole = () => {
    if (user && user.accType) {
      return user.accType.charAt(0).toUpperCase() + user.accType.slice(1).toLowerCase();
    }
    return '';
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-black px-6 py-3 flex justify-between items-center border-b-2 border-[#1abc9c] relative z-10">
      <div className="flex items-center gap-2.5">
        <img src="./logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-[#1abc9c] text-2xl font-bold m-0">SkillLink</h1>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex md:items-center gap-5 m-0 p-0 list-none absolute md:relative top-16 md:top-0 right-0 bg-[#111] md:bg-transparent flex-col md:flex-row w-48 md:w-auto p-5 md:p-0 rounded-lg md:rounded-none`}>
        <li><Link to="/" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Home</Link></li>
        
        {/* Client Navigation */}
        {user && user.accType && user.accType.toLowerCase() === 'client' && (
          <>
            <li><Link to="/dashboard" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Dashboard</Link></li>
            <li><Link to="/post-job" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Post Job</Link></li>
            <li><Link to="/active-jobs" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">All Jobs</Link></li>
            <li><Link to="/ongoingJobs" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Ongoing Jobs</Link></li>
            <li><Link to="/transactions" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Transactions</Link></li>
          </>
        )}

        {/* Freelancer Navigation */}
        {user && user.accType && user.accType.toLowerCase() === 'freelancer' && (
          <>
            <li><Link to="/dashboard" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Dashboard</Link></li>
            <li><Link to="/browse-jobs" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Browse Jobs</Link></li>
            <li><Link to="/proposals" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">My Proposals</Link></li>
            <li><Link to="/ongoingFreelancerJobs" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Ongoing Jobs</Link></li>
            <li><Link to="/transactions" className="text-white no-underline px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium">Transactions</Link></li>
          </>
        )}

        {/* User Balance Display */}
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
                <span className="flex items-center gap-2 text-[#1abc9c] text-sm font-semibold">
                  <span className="before:content-['🔗']">Connects: {freelancerDetails.connects || 0}</span>
                </span>
              </>
            ) : (
              <span className="text-[#f1c40f] text-sm italic">Loading freelancer details...</span>
            )}
          </li>
        )}

        {/* User Dropdown */}
        {user ? (
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 text-white px-3.5 py-2 rounded-lg transition-colors duration-300 hover:bg-[#1abc9c] hover:text-black font-medium"
            >
              <span>{user.name}</span>
              <span className="text-xs text-[#1abc9c]">{getUserRole()}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#111] rounded-lg shadow-lg border border-[#1abc9c55]">
                <Link
                  to="/profile"
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#1abc9c] hover:text-black transition-colors duration-300"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#1abc9c] hover:text-black transition-colors duration-300"
                >
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#1abc9c] hover:text-black transition-colors duration-300"
                >
                  Logout
                </button>
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
    </nav>
  );
};

export default Navbar;
