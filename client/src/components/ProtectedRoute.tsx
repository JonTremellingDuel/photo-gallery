// ProtectedRoute.js
import React, { PropsWithChildren } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateSchema } from '../store';

interface ProtectedRouteProps {
  token: string,
  children: any
}

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({token, children}) => {
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
  
  const mapStateToProps = (state: stateSchema) => {
    return {
      token: state.persisted?.token
    }};
  
  export default connect(mapStateToProps, {})(ProtectedRoute);
