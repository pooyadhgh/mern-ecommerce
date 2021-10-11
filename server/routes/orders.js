import express from 'express';
import {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orders.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// /api/orders/
router.route('/').post(checkAuth, addOrder);
router.route('/myorders').get(checkAuth, getMyOrders);
router.route('/:id').get(checkAuth, getOrderById);
router.route('/:id/pay').put(checkAuth, updateOrderToPaid);

export default router;
