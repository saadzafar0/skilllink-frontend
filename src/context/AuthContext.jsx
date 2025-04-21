import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { id, name, email, accType } or null
  const [loading, setLoading] = useState(true);

  // Simulated initial check (like from localStorage or cookie)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('skilllink-user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('skilllink-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skilllink-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
