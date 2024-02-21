// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearToken } from '../actions';
import { stateSchema } from 'store';

interface LogoutProps {
  clearToken: any,
}

const Logout: React.FC<LogoutProps> = ({clearToken}) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      clearToken()
      navigate('/login');
    } catch(error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    };
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

const mapStateToProps = (state: stateSchema) => ({
  token: state.persisted?.token
});

const mapDispatchToProps = {
  clearToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
