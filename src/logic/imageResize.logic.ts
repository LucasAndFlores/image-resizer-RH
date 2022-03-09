import { Service, Container } from "typedi";
import { ImageResizeRepository } from "../repositories";
import { IImageFormatDTO } from "../dto/IImageFormatDTO";
import Sharp from "sharp";
import { AppError } from "../errors/AppError";
import { IHandleFile } from "../interfaces";
@Service()
export class ImageResizeLogic {
  private imageRepository: ImageResizeRepository;

  constructor() {
    this.imageRepository = Container.get(ImageResizeRepository);
  }

  async execute({ height, imageName, width, dirPath }: IImageFormatDTO) {
    let filePath: IHandleFile = {
      dir: "",
    };

    if (!dirPath) {
      filePath = await this.imageRepository.find(imageName);
    } else {
      filePath.dir = dirPath as string;
    }

    if (!filePath?.dir) {
      throw new AppError("Image not found", 404);
    }

    const imageResize = await Sharp(filePath.dir)
      .resize(width, height, {
        fit: "fill",
      })
      .toFormat("png")
      .toBuffer();

    const buffToString = imageResize.toString("base64");

    const html = `<html><body><img src='data:image/png;base64,${buffToString}'/></body></html>`;

    return html;
  }
}
