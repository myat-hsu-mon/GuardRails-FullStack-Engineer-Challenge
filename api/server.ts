import express, { Application } from "express";
import mongoose from "mongoose";
import "dotenv/config";

const port = process.env.PORT;
const mongodbUrl = process.env.MONGODB_URL || "";

const app: Application = express();

mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log("Database connection successfully");
  })
  .catch((error) => {
    console.log("Database connection errors", error);
  });

app.listen(port, () => {
  console.log(`The server is listening on port: ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log("UnhandledRejection: ", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("UncaughtException: ", error);
  process.exit(1);
});

module.exports = app;
