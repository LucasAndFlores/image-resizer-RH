import { Request, Response, NextFunction } from "express";
import { Container, Service } from "typedi";
import { ImageResizeLogic } from "../logic";

@Service()
export class ImageResizeController {
  constructor(private logic: ImageResizeLogic) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageName, height, width } = req.params;

      let path = "";

      if (req.cacheFile?.dirPath) {
        path = req.cacheFile?.dirPath;
      }

      const response = await this.logic.execute({
        imageName: imageName as string,
        height: Number(height),
        width: Number(width),
        dirPath: path,
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
