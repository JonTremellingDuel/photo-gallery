// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DataService from '../services/DataService';
import './Dashboard.css';

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        // Fetch request
        const response = await DataService
          .GET('/api/auth/check-auth', {
            'authorization': `bearer ${token}`,
          });

        if (response.status === 403) {
          navigate('/login');
        }
        setUser(response.user);
      } catch(error) {
          // Handle errors
          console.error('There was a problem with the fetch operation:', error);
      };
    }

    fetchUser()
  }, []);

  return (
    <div class="container mt-2">
      <div class="row justify-center">
        <div class="col-12-xs col-10-sm col-5-xl">
          <div class="container">
            {user ? (
              <div className="dashboard-content">
                <h1>Welcome to the Dashboard</h1>
                <p>Hello, {user.username}!</p>
                <p>Email: {user.email}</p>
                <p>This is a protected area.</p>
                <Link to="/logout" className="logout-link">
                  Logout
                </Link>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.counter.token
});

export default connect(mapStateToProps, {})(Dashboard);
