import { readdir, stat } from "fs/promises";
import path from "path";
import { Service } from "typedi";
import { IImageResizeRepository, IHandleFile } from "../interfaces";

@Service()
export class ImageResizeRepository implements IImageResizeRepository {
  async find(filename: string): Promise<IHandleFile> {
    const filePath = path.resolve(__dirname, "..", "imgs");

    let handleFile: IHandleFile = {
      path: "",
    };

    try {
      const files = await readdir(filePath);
      files.forEach((file) => {
        let removePoint = file.slice(0, file.indexOf("."));

        if (filename == removePoint) {
          handleFile.path = `${filePath}/${file}`;
        }
      });
    } catch (error) {
      console.log(error);
    }

    return handleFile;
  }
}
