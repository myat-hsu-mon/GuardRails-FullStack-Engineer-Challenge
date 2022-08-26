import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
//app
export const app = require("./server");
//routes
import resultRoute from "./routes/resultRoute";
//controllers
import errorController from "./controllers/errorController";
//utils
import AppError from "./utils/appError";

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many attempts for this ip, please try again in an hour.",
});

//middlewares
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(morgan("dev")); // logger
app.use(helmet()); // To set secure http headers
app.use("/api", limiter); // To limit too many attempts(Brute-force Attack)
app.use(xss()); // To prevent xss attack
app.use(mongoSanitize()); // To prevent nosql injections

app.use("/api/v1/results", resultRoute);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`${req.originalUrl} is not found!`, 404));
});
//Global Error handling
app.use(errorController);
