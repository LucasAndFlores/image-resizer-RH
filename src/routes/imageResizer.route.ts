import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { ImageResizeController } from "../controllers";
import { ImageResizeValidator } from "./schemas";
import { RouteValidator } from "./validation";

const imageResizeRouter = Router();

const controller = new ImageResizeController();

imageResizeRouter.get(
  "/resize/:imageName/:width/:height",
  RouteValidator.validate(ImageResizeValidator.get()),
  async (req: Request, res: Response, next: NextFunction) => {
    await controller.handle(req, res, next);
  }
);

export { imageResizeRouter };
