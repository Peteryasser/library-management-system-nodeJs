import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import userRoutes from './modules/user/user.routes';
import bookRoutes from './modules/book/book.routes';

import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import borrowRoutes from './modules/borrow/borrow.routes';
import reportRoutes from './modules/report/report.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api/reports', reportRoutes);


// Centralized Error Handling Middleware
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

  module.exports = app;