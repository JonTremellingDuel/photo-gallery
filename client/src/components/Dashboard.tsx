import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DataService from '../services/DataService';
import './Dashboard.css';
import { stateSchema } from '../store'

interface DashboardProps {
  token: string;
}

interface UserSchema {
  id: string,
  email: string,
  password: string
  username: string
}

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSchema>();

  useEffect(() => {
    async function fetchUser() {
      // Fetch request
      const {code, error, body} = await DataService
        .GET('/api/auth/check-auth', {
          'authorization': `bearer ${token}`,
        });

      if (code === 403) {
        navigate('/login');
      }

      if (error) {
        console.log(error);
      }
      
      setUser(body?.user);
    }

    fetchUser()
  }, []);

  return (
    <div className="container mt-2">
      <div className="row justify-center">
        <div className="col-12-xs col-10-sm col-5-xl">
          <div className="container">
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

const mapStateToProps = (state: stateSchema) => ({
  token: state.persisted?.token
});

export default connect(mapStateToProps, {})(Dashboard);
