import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/users.js';
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

// /api/users
router.route('/').post(registerUser);

// /api/users/login
router.route('/login').post(authUser);

// /api/users/profile
router
  .route('/profile')
  .get(checkAuth, getUserProfile)
  .put(checkAuth, updateUserProfile);

export default router;
