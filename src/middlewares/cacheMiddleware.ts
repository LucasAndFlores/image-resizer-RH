import { Request, Response, NextFunction, request } from "express";
import { cache } from "../app";

export function verifyIfImageCacheExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { imageName } = req.params;

  if (cache.has(imageName)) {
    let filePath = cache.get(imageName) as string;
    req.cacheFile = {
      dirPath: filePath,
    };
    next();
  } else {
    next();
  }
}
