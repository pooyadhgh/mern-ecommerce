import express from 'express';
import Product from '../models/products.js';
import HttpError from '../models/httpError.js';

const router = express.Router();

// /api/products/
router.get('/', async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError('Finding products failed', 500);
    return next(error);
  }

  if (!products) {
    const error = new HttpError('Products not found', 404);
    return next(error);
  }

  res.json(products);
});

// /api/products/:id
router.get('/:id', async (req, res, next) => {
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError('Finding product failed', 500);
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Product not found', 404);
    return next(error);
  }

  res.json(product);
});

export default router;
