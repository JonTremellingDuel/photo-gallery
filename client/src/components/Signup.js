// src/components/Signup.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DataService from '../services/DataService';

const Signup = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await DataService
      .POST('/api/auth/signup', {
        body: JSON.stringify(formData)
      },
    );

    navigate('/');
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
  token: state.persisted.token
});

export default connect(mapStateToProps, {})(Signup);
