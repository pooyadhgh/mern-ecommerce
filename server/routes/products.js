import express from 'express';
import { getProductById, getProducts } from '../controllers/products.js';

const router = express.Router();

// /api/products/
router.route('/').get(getProducts);

// /api/products/:id
router.route('/:id').get(getProductById);

export default router;
