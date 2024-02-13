// ProtectedRoute.js
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ token, children }) => {
    const location = useLocation().pathname.slice(1);
    const notLoggedIn = ['login', 'signup'].includes(location);
    if (! token && ! notLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (token && notLoggedIn) {
        return <Navigate to="/" replace />;
    }
  
    return children;
  };
  
  const mapStateToProps = (state) => ({
    token: state.counter.token
  });
  
  export default connect(mapStateToProps, {})(ProtectedRoute);
