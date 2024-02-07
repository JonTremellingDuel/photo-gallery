// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  // Handle validation errors
  let errors = { email: '', password: '' };

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // 3 days

const createToken = (id) => {
  return jwt.sign({ id }, 'your-secret-key', {
    expiresIn: maxAge,
  });
};

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ 
      user: user._id,
      token,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(201).json({ 
      user: user._id,
      token,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true });

  res.status(200).json({ message: 'Logout successful' });
};

const requireAuth = (req, res, next) => {
  // Get the auth header value (bearer token)
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    // Split the header value to get the token
    const bearerToken = bearerHeader.split(' ')[1];

    // Set the token in the request object
    req.token = bearerToken;

    // Verify the token
    jwt.verify(bearerToken, 'your-secret-key', (err, authData) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden' });
      } else {
        // Set the user ID in the request object
        req.userId = authData.id;
        next();
      }
    });
  } else {
    // If the token is not provided, return Forbidden
    res.status(403).json({ message: 'Forbidden' });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assuming you have a User model

    if (user) {
      res.status(200).json({ user: user }); // Send user details in the response
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, login, logout, requireAuth, checkAuth };
