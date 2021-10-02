import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';
import productRoutes from './routes/products.js';

dotenv.config();
connectDB();

const app = express();

app.use('/api/products', productRoutes);

// Custom error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Port: ${PORT} - Env: ${process.env.NODE_ENV}`));
