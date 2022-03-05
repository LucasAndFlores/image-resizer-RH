import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import { AppError } from "./errors/AppError";
import { getRoutes } from "./routes";

const app = express();

app.use(express.json());

app.use(getRoutes());

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

app.listen(5050, () => console.log(`Server is running on port: 5050`));
