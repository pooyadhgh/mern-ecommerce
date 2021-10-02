import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/products.js';

const router = express.Router();

// /api/products/
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// /api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
