import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-black px-6 py-3 flex justify-between items-center border-b-2 border-[#1abc9c] relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="./logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-[#1abc9c] text-2xl font-semibold">SkillLink</h1>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex list-none gap-5 items-center absolute md:static top-16 right-0 bg-[#111] md:bg-transparent w-[200px] md:w-auto p-5 md:p-0 rounded-xl flex-col md:flex-row transition-all duration-300`}
      >
        <li>
          <Link to="/" className="text-white px-3 py-2 rounded-lg hover:bg-[#1abc9c] hover:text-black font-medium transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white px-3 py-2 rounded-lg hover:bg-[#1abc9c] hover:text-black font-medium transition">
            Dashboard
          </Link>
        </li>
        {user ? (
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-[#1abc9c] text-black px-3 py-2 rounded-lg font-medium hover:bg-[#1abc9c] transition"
            >
              Profile ▾
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-[#222] p-4 rounded-xl shadow-lg flex flex-col min-w-[160px] z-50">
                <span className="text-[#eee] text-sm mb-2">{user.name}</span>
                <span className="text-[#eee] text-sm mb-2">{user.accType}</span>
                <button
                  onClick={logout}
                  className="bg-[#1abc9c] text-black font-semibold py-1 px-2 rounded-md hover:bg-[#16a085] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white px-3 py-2 rounded-lg hover:bg-[#1abc9c] hover:text-black font-medium transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white px-3 py-2 rounded-lg hover:bg-[#1abc9c] hover:text-black font-medium transition">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger Menu */}
      <div
        onClick={toggleMenu}
        className="text-3xl text-[#1abc9c] cursor-pointer md:hidden"
      >
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
