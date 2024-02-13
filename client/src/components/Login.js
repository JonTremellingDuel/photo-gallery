// src/components/Login.js
import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeToken } from '../actions';

const Login = ({ storeToken, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

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
          storeToken(token);
          navigate('/');
        }
    } catch(error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
        setError('Login failed. Please check your information and try again.');
    };
  };

  return (
    <div>
      <div class="text-white bg-error p-2 br-xs">
        <div class="container text-center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, perspiciatis!</p>
        </div>
      </div>
      <div class="container mt-2">
        <div class="row justify-center">
          <div class="col-12-xs col-10-sm col-5-xl">
            <div class="container">
              <div class="form centered-fields">
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" class="btn-primary text-white">
                    Login
                  </button>
                  <p class="pt-1">
                    Don't have an account? 
                    <span class="pl-1 text-primary text-hover-orange-light-1">
                      <Link to="/signup">Sign up here</Link>
                    </span>
                  </p>
                </form>
              </div>
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

const mapDispatchToProps = {
  storeToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
