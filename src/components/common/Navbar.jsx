import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
