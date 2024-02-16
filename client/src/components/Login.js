// src/components/Login.js
import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeToken, setError } from '../actions';
import DataService from '../services/DataService';
import Error from './Error';

const Login = ({ storeToken, setError }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const {code, error, body} = await DataService
      .POST('/api/auth/login', {
          body: JSON.stringify(formData)
        },
      );

    if (error) {
      if ([400, 500].includes(code)) {
        setError('Incorrect login details');
      }
      else {
        setError(error);
      }
    }
    else {
      storeToken(body?.token);
      navigate('/');
    }
  };

  return (
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
      <Error></Error>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.persisted.token
});

const mapDispatchToProps = {
  storeToken,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
