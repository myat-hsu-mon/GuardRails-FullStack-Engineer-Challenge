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

export const createNewResult = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await Result.create(req.body);

    res.status(201).json({
      success: true,
      message: "A new result is created",
      data: result,
    });
  }
);

export const getResult = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await Result.findById(req.params.id);

    if (!result) return next(new AppError("No result found with this id", 404));

    res.status(200).json({
      success: true,
      message: "A result is retrieved",
      data: result,
    });
  }
);

export const updateResult = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!result) return next(new AppError("No result found with this id", 404));

    res.status(201).json({
      success: true,
      message: "A result is updated",
      data: result,
    });
  }
);
