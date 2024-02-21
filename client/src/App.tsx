// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute';
import { NotificationsProvider } from './components/notifications/NotificationsContext';
import Notifications from './components/notifications/Notifications';
import './scss/index.scss'

const App = () => {
  return (
    <div>
      <nav className="navbar justify-between">
        <div className="container">
          <h1 className="site-title">Photo Gallery</h1>
          <ul className="display-f">
            <li className="ml-1 text-hover-secondary"><a href="#work">Our Work</a></li>
            <li className="ml-1 text-hover-secondary"><a href="#about">About Us</a></li>
          </ul>
        </div>
      </nav>
      <Provider store={store}>
        <NotificationsProvider>
          <Notifications />
          <Router>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
              <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </NotificationsProvider>
      </Provider>
    </div>
  );
};

export default App;
