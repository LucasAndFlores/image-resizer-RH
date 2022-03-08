import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { ImageResizeController } from "../controllers";
import { verifyIfImageCacheExist } from "../middlewares/cacheMiddleware";
import { ImageResizeValidator } from "./schemas";
import { RouteValidator } from "./validation";
import NodeCache from "node-cache";

const imageResizeRouter = Router();

const cache = new NodeCache({ stdTTL: 60 });

const controller = new ImageResizeController();

imageResizeRouter.get(
  "/resize/:imageName/:width/:height",
  RouteValidator.validate(ImageResizeValidator.get()),
  verifyIfImageCacheExist,
  async (req: Request, res: Response, next: NextFunction) => {
    await controller.handle(req, res, next);
  }
);

export { imageResizeRouter, cache };
