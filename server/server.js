import express from 'express';
import dotenv from 'dotenv';
import HttpError from './models/httpError.js';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';

dotenv.config();
connectDB();

const app = express();

app.use('/api/products', productRoutes);

// Notfound error middleware
app.use((req, res, next) => {
  const error = new HttpError('Not Found', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => console.log(err));
  }

  if (res.headerSet) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Port: ${PORT} - Env: ${process.env.NODE_ENV}`));
