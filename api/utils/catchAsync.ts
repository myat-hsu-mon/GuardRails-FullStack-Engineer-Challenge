import { NextFunction, Request, Response } from "express";
//utils
import AppError from "./appError";

const catchAsync =
  (func: any) => (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((error: { message: string }) => {
      return next(new AppError(error.message, 400));
    });
  };

export default catchAsync;
