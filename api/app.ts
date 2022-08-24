import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
//app
import app from "./server";
//routes
import resultRoute from "./routes/resultRoute";
//controllers
import errorController from "./controllers/errorController";
//utils
import AppError from "./utils/appError";

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1/results", resultRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`${req.originalUrl} is not found!`, 404));
});
//Global Error handling
app.use(errorController);
