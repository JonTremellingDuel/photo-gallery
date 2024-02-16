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
import './scss/index.scss'

const App = () => {
  return (
    <div>
      <nav class="navbar justify-between">
        <div class="container">
          <h1 class="site-title">Photo Gallery</h1>
          <ul class="display-f">
            <li class="ml-1 text-hover-secondary"><a href="#work">Our Work</a></li>
            <li class="ml-1 text-hover-secondary"><a href="#about">About Us</a></li>
          </ul>
        </div>
      </nav>
      <Provider store={store}>
        <Error></Error>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
