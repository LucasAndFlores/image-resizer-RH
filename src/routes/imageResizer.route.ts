import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { ImageResizeController } from "../controllers";

export const imageResizeRouter = () => {
  const router = Router();

  const controller = Container.get(ImageResizeController);

  router.get(
    "/resize/:imageName/:width/:height",
    async (req: Request, res: Response, next: NextFunction) => {
      await controller.handle(req, res, next);
    }
  );

  return router;
};
