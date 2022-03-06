import * as Joi from "joi";
import { ValidationError } from "joi";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export interface SchemaValidator {
  body?: Joi.Schema;
  query?: Joi.Schema;
  params?: Joi.Schema;
}
interface ValidationResult {
  bodyError?: ValidationError;
  queryError?: ValidationError;
  parameterError?: ValidationError;
}
export class RouteValidator {
  static validate(schema: SchemaValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const validateResult: ValidationResult = {};
      if (schema.params) {
        validateResult.parameterError = schema.params.validate(
          req.params
        ).error;
      }

      const valid =
        !validateResult.bodyError &&
        !validateResult.parameterError &&
        !validateResult.queryError;

      if (valid) {
        next();
      } else {
        const details = validateResult.parameterError
          ? validateResult.parameterError.details
          : [];
        const message = details.map((i) => i.message).join("; \n ");

        throw new AppError(message, 422);
      }
    };
  }
}
