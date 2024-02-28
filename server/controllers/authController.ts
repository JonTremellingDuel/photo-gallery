import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Assuming the path to the User model
import * as jwt from 'jsonwebtoken';

interface ErrorProperties {
  path: string;
  message: string;
}

const handleErrors = (err: any) => {
  let errors: Record<string, string> = { email: '', password: '' };

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // 3 days

const createToken = (id: string) => {
  return jwt.sign({ id }, 'your-secret-key', {
    expiresIn: maxAge,
  });
};

export const signup = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    if (user) {
      const token = createToken(user._id);
      res.status(201).json({ 
        user: user._id,
        token,
      });
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    const errors = handleErrors(err);
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

    jwt.verify(bearerToken, 'your-secret-key', (err: any, authData: any) => {
      if (err) {
        res.status(403).json({ message: 'Forbidden' });
      } else {
        req.userId = (authData as { id: string }).id;
        next();
      }
    });
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
