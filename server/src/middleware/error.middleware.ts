import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Set default error status code if not provided
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
