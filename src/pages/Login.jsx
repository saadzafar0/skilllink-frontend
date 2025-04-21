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
    <div className="flex justify-center items-center h-[90vh] bg-[#f0f8f8]">
      <div className="bg-white p-12 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-full max-w-[400px] text-center">
        <h2 className="text-teal-700 text-2xl font-semibold mb-2">Welcome Back 👋</h2>
        <p className="text-[#555] mb-8">Login to your SkillLink account</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-[92%] p-4 mb-4 border border-gray-300 rounded-lg text-base"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-[92%] p-4 mb-4 border border-gray-300 rounded-lg text-base"
          />
          <button
            type="submit"
            className="w-full p-4 bg-teal-700 text-white rounded-lg text-base font-medium hover:bg-teal-800 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-700">
          Don’t have an account?{' '}
          <a href="/register" className="text-teal-700 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
