import express from 'express';
import { authUser, getUserProfile } from '../controllers/users.js';
import { checkAuth } from '../middleware/auth.js';
const router = express.Router();

// /api/users/login
router.route('/login').post(authUser);

// /api/users/profile
router.route('/profile').get(checkAuth, getUserProfile);

export default router;
