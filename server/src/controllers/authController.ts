import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Assuming the path to the User model
const jwt = require('jsonwebtoken');

interface ErrorProperties {
  message: string, 
  errors: Array<{
      properties: {
        path: string, 
        message: string
      }
  }>
}

const handleErrors = (err: ErrorProperties) => {
  let errors: Record<string, string> = { email: '', password: '' };

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // 3 days

const JWT_SECRET_KEY = 'your_secret_key';

// Function to generate JWT tokens
export const generateJWT = (user: {_id: string, email: string}) => {
    // Create a JWT token with user data and sign it with the secret key
    const token = jwt.sign({
        userId: user._id, // You may use user ID or any other unique identifier
        email: user.email
        // Add more claims as needed
    }, JWT_SECRET_KEY, { expiresIn: maxAge }); // Token expires in 1 hour

    return token;
}

export const verifyJWT = (token: string) => {
  // Verify the token using the secret key
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  // If the token is valid, return the decoded payload
  return decoded;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const token = generateJWT({
      _id: user._id,
      email: user.email
    });
    res.status(201).json({ 
      user: user._id,
      token,
    });
  } catch (err) {
    const errors = handleErrors(err as ErrorProperties);
    res.status(400).json({ errors });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (user) {
      const token = generateJWT({
        _id: user._id,
        email: user.email
      });
      res.status(201).json({ 
        user: user._id,
        token,
      });
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    const errors = handleErrors(err as ErrorProperties);
    res.status(400).json({ errors });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true });

  res.status(200).json({ message: 'Logout successful' });
};

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    try {
      const response = verifyJWT(bearerToken);
      req.userId = (response.userId as { id: string });
      next();
    }
    catch (error) {
      res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
      return res.sendStatus(403);
    }
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

export const checkAuth = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
