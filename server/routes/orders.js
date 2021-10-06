import express from 'express';
import { addOrder } from '../controllers/orders.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// /api/orders/
router.route('/').post(checkAuth, addOrder);

export default router;
