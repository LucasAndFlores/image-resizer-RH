import { Request, Response, NextFunction } from "express";
import { Container, Service } from "typedi";
import { ImageResizeLogic } from "../logic";

@Service()
export class ImageResizeController {
  private logic: ImageResizeLogic;

  constructor() {
    this.logic = Container.get(ImageResizeLogic);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageName, height, width } = req.params;

      const response = await this.logic.execute({
        imageName: imageName as string,
        height: Number(height),
        width: Number(width),
      });
      return res
        .status(200)
        .setHeader("content-type", "text/html")
        .send(response);
    } catch (error) {
      next(error);
    }
  }
}
