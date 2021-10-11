import express from 'express';
import { addOrder, getOrderById } from '../controllers/orders.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// /api/orders/
router.route('/').post(checkAuth, addOrder);
router.route('/:id').get(checkAuth, getOrderById);

export default router;
