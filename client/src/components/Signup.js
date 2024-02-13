// src/components/Signup.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Signup = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5050/api/auth/signup';
    
    // Fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };
      
    // Fetch request
    fetch(url, options)
      .then(response => {
        // Check if response is ok (status in the range 200-299)
        if (!response.ok) {
          console.log('Network response was not ok');
          setError('Unable to create an account. Please check your information and try again.');
        }
      })
      .then(data => {
        console.log('Signup successful:', data);
        navigate('/');
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
        setError('Unable to create an account. Please check your information and try again.');
      });
  };

  return (
    <div class="container mt-2">
      <div class="row justify-center">
        <div class="col-12-xs col-10-sm col-5-xl">
          <div class="container">
            <div class="form centered-fields">
              <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="username"
                  placeholder='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input 
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  required />
                <input
                  type="password"
                  name="password"
                  placeholder='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="submit" class="btn-primary text-white">Sign up</button>
                {error && <p className="error-message">{error}</p>}
                <p class="pt-1">
                  Already have an account? 
                  <span class="pl-1 text-primary text-hover-orange-light-1">
                    <Link to="/login">Login here</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.counter.token
});

export default connect(mapStateToProps, {})(Signup);
