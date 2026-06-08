import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    message,
  });
};
