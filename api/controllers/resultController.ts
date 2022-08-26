import { NextFunction, Request, Response } from "express";
//models
import Result from "../models/resultModel";
//utils
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import LimitQuery from "../utils/limitQuery";

export const getAllResults = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limitQuery = new LimitQuery(Result.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();
    const results = await limitQuery.query;

    res.status(200).json({
      success: true,
      message: "All results are retrieved",
      data: results,
    });
  }
);
