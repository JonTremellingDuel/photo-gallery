// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/auth/check-auth', { withCredentials: true });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        navigate('/login');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-container">
      {userData ? (
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard</h1>
          <p className="user-greeting">Hello, {userData.username}!</p>
          <p className="user-email">Email: {userData.email}</p>
          <p>This is a protected area.</p>
          <Link to="/logout" className="logout-link">
            Logout
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
