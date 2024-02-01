// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get('http://localhost:5050/api/auth/logout', { withCredentials: true });
        // Clear any local user authentication state (if applicable)
        // Redirect the user to the login page or another appropriate page
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error.message);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
