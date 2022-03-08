import { Service, Container } from "typedi";
import { ImageResizeRepository } from "../repositories";
import { IImageFormatDTO } from "../dto/IImageFormatDTO";
import Sharp from "sharp";
import { AppError } from "../errors/AppError";

@Service()
export class ImageResizeLogic {
  imageRepository: ImageResizeRepository;

  constructor() {
    this.imageRepository = Container.get(ImageResizeRepository);
  }

  async execute({ height, imageName, width, dirPath }: IImageFormatDTO) {
    let newFilePath = {
      path: "",
    };

    if (!dirPath) {
      newFilePath = await this.imageRepository.find(imageName);
    } else {
      newFilePath.path = dirPath as string;
    }

    if (!newFilePath?.path) {
      throw new AppError("Image not found", 404);
    }

    const imageTest = await Sharp(newFilePath.path)
      .resize(width, height, {
        fit: "fill",
      })
      .toFormat("png")
      .toBuffer();

    const buffToString = imageTest.toString("base64");

    const html = `<html><body><img src='data:image/png;base64,${buffToString}'/></body></html>`;

    return html;
  }
}
