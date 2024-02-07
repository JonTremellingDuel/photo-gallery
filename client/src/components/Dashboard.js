// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Dashboard.css';

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const url = 'http://localhost:5050/api/auth/check-auth';
      // Fetch options
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${token}`,
        },
      };

      try {
        // Fetch request
        const response = await fetch(url, options);
        if (response.status === 403) {
          navigate('/login');
        }
        const json = await response.json();
        setUser(json.user);
      } catch(error) {
          // Handle errors
          console.error('There was a problem with the fetch operation:', error);
      };
    }

    fetchUser()
  }, []);

  return (
    <div className="dashboard-container">
      {user ? (
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard</h1>
          <p className="user-greeting">Hello, {user.username}!</p>
          <p className="user-email">Email: {user.email}</p>
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

const mapStateToProps = (state) => ({
  token: state.counter.token
});

export default connect(mapStateToProps, {})(Dashboard);
