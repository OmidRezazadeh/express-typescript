import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    error.statusCode = error.status || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } catch (err) {
    console.error('Error in errorHandler while handling error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};