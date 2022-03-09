import "reflect-metadata";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppError } from "./errors/AppError";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Interal Server Error - ${error.message}`,
    });
  }
);

export { app };
