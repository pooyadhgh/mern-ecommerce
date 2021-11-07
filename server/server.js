import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import HttpError from './models/httpError.js';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const __dirname = path.resolve();

// Statit files on the production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

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
