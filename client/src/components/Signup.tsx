// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import DataService from '../services/DataService';
import { stateSchema } from 'store';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await DataService
      .POST('/api/auth/signup', {
        body: JSON.stringify(formData)
      },
    );

    navigate('/');
  };

  return (
    <div className="container mt-2">
      <div className="row justify-center">
        <div className="col-12-xs col-10-sm col-5-xl">
          <div className="container">
            <div className="form centered-fields">
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
                <button type="submit" className="btn-primary text-white">Sign up</button>
                {error && <p className="error-message">{error}</p>}
                <p className="pt-1">
                  Already have an account? 
                  <span className="pl-1 text-primary text-hover-orange-light-1">
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

export default Signup;
