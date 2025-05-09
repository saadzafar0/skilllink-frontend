
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);

        login({
          userID: data.userID,
          name: data.name,
          email: data.email,
          accType: data.accType,
        });

        navigate('/dashboard');
      } else {
        console.error('Login failed:', data.message);
        alert('Login failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Server error during login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#1abc9c]">Welcome Back 👋</h2>
          <p className="mt-2 text-center text-[#888]">Login to your SkillLink account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#1abc9c] transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#1abc9c] text-white rounded-lg font-semibold hover:bg-[#16a085] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#1abc9c] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-[#888]">
          Don't have an account?{' '}
          <a href="/register" className="text-[#1abc9c] hover:text-[#16a085] transition-colors duration-300">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
