// src/pages/Login.jsx
import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ import context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function from context
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

        // ✅ Save user to context
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
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p>Login to your SkillLink account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
