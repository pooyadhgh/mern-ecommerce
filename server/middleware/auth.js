import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import HttpError from '../models/httpError.js';

export const checkAuth = async (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer Token

    if (!token) {
      const error = new HttpError('Token not found', 404);
      return next(error);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decodedToken.id).select('-password');
    req.user = user;
    next();
  } catch (err) {
    const error = new HttpError('Could Not Authenticate', 500);
    return next(error);
  }
};
