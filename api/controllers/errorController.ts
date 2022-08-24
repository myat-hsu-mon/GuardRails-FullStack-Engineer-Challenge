import { NextFunction, Request, Response } from "express";

const errorController = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;

  return res.status(statusCode).json({
    success: false,
    message: message || "Internal Server Error",
    error,
  });
};

export default errorController;
