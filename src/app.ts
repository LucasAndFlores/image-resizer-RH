import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "./errors/AppError";
import { getRoutes } from "./routes";

const app = express();

app.use(express.json());

Sentry.init({
  dsn: "https://e8894fba002c4f27a5a3b9efcaf93acd@o1160549.ingest.sentry.io/6245066",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(getRoutes());

app.use(Sentry.Handlers.errorHandler());

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
