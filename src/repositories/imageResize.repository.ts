import { readdir } from "fs/promises";
import path from "path";
import { Service } from "typedi";
import { AppError } from "../errors/AppError";
import { IImageResizeRepository, IHandleFile } from "../interfaces";

@Service()
export class ImageResizeRepository implements IImageResizeRepository {
  async find(filename: string): Promise<IHandleFile> {
    try {
      const filePath = path.resolve(__dirname, "..", "imgs");

      let handleFile: IHandleFile = {
        path: "",
      };
      const files = await readdir(filePath);
      files.forEach((file) => {
        let removePoint = file.slice(0, file.indexOf("."));

        if (filename == removePoint) {
          handleFile.path = `${filePath}/${file}`;
        }
      });
      return handleFile;
    } catch (error) {
      throw new AppError("Bad request", 400);
    }
  }
}
