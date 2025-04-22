import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
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
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./logo.png" alt="logo" className="avatar-img" />
        <h1>SkillLink</h1>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        {user && user.accType && user.accType.toLowerCase() === 'client' && (
          <li className="nav-link-item client-balance">
            {clientDetails ? (
              <>
                <span className="balance">Balance: ${clientDetails.amount || 0}</span>
                <span className="spent">Spent: ${clientDetails.spent || 0}</span>
              </>
            ) : (
              <span className="loading">Loading client details...</span>
            )}
            {error && <span className="error">Error: {error}</span>}
          </li>
        )}
        {user && user.accType && user.accType.toLowerCase() === 'freelancer' && (
          <li className="nav-link-item freelancer-balance">
            {freelancerDetails ? (
              <>
                <span className="balance">Balance: ${freelancerDetails.amount || 0}</span>
                <span className="earned">Earned: ${freelancerDetails.earned || 0}</span>
              </>
            ) : (
              <span className="loading">Loading freelancer details...</span>
            )}
            {error && <span className="error">Error: {error}</span>}
          </li>
        )}
        {user ? (
          <li className="nav-link-item dropdown">
            <button onClick={toggleDropdown} className="nav-link profile-btn">
              Profile ▾
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                <span className="dropdown-name">{user.name}</span>
                <span className="dropdown-type">{user.accType}</span>
                <button className="logout-btn" onClick={logout}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </>
        )}
      </ul>

      <div onClick={toggleMenu} className="hamburger-menu">
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
