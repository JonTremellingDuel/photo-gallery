// src/components/Login.js
import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Dashboard from './Dashboard';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5050/api/auth/login';
    
    // Fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
      
    try {
      // Fetch request
      const response = await fetch(url, options);
      const {token} = await response.json();
        // Check if response is ok (status in the range 200-299)
        if (! token) {
          console.log('Network response was not ok');
          setError('Login failed. Please check your information and try again.');
        }
        else {
          localStorage.setItem('token', token);
          navigate('/');
        }
    } catch(error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
        setError('Login failed. Please check your information and try again.');
    };
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
