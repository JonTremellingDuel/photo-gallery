// ProtectedRoute.js
import React, { PropsWithChildren, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateSchema } from '../store';
import { storeToken } from '../actions';

interface ProtectedRouteProps {
  token: string,
  storeToken: (token: string) => {},
  children: any
}

const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({token, storeToken, children}) => {


    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    if (accessToken) {
      storeToken(accessToken);
    }
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
    }
  };
  
  const mapDispatchToProps = {
    storeToken,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
