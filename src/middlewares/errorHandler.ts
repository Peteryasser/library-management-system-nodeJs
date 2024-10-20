import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';

export function errorHandler(err: CustomError | Error, req: Request, res: Response, next: NextFunction): void {
  const statusCode = (err instanceof CustomError) ? err.statusCode : 500;
  let message = err.message || 'Internal Server Error';

  if (err.message.includes('Duplicate entry')) {
    message = 'This email is already registered. Please use a different email.';
  } else if (err.message.includes('Data truncated')) {
    message = 'Invalid data provided. Please check your input (e.g., role or other fields).';
  }

  // Send clean response to the client
  res.status(statusCode).json({ message });
}