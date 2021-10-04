import User from '../models/users.js';
import HttpError from '../models/httpError.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  // Check whether user exists or not
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Login Failed', 500);
    return next(error);
  }

  // Check if user entered correct password
  if (!existingUser) {
    const error = new HttpError('Invalid Inputs', 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Could Not Login', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid Inputs', 401);
    return next(error);
  }

  const token = await generateToken({ id: existingUser.id });

  res.json({
    message: 'User Logged in',
    _id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    isAdmin: existingUser.isAdmin,
    token: token,
  });
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user is registered before or not
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User Existed', 422);
    return next(error);
  }

  // Hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could Not Create User', 500);
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signup Failed', 500);
    return next(error);
  }

  const token = await generateToken({ id: createdUser.id });

  res.status(201).json({
    message: 'User Signedup',
    _id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    isAdmin: createdUser.isAdmin,
    token: token,
  });
};

export const getUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  let existingUser;

  // Check whether user exists or not
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Auth Failed', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Auth Failed', 401);
    return next(error);
  }

  res.json({
    _id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    isAdmin: existingUser.isAdmin,
  });
};

export const updateUserProfile = async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = req.user._id;
  let existingUser;

  // Check whether user exists or not
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Auth Failed', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Auth Failed', 401);
    return next(error);
  }

  let hashedPassword;
  if (password) {
    // Hash password
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError('Could Not Update User', 500);
      return next(error);
    }
  }

  existingUser.name = name || existingUser.name;
  existingUser.email = email || existingUser.email;
  if (password) existingUser.password = hashedPassword;

  let updatedUser;
  try {
    updatedUser = await existingUser.save();
  } catch (err) {
    console.log('err inja');
  }

  const token = await generateToken({ id: updatedUser.id });

  res.json({
    message: 'User Updated',
    _id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    isAdmin: updatedUser.isAdmin,
    token: token,
  });
};
