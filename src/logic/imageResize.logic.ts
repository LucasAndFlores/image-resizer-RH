import { Service, Container } from "typedi";
import { ImageResizeRepository } from "../repositories";
import { IImageFormatDTO } from "../dto/IImageFormatDTO";
import Sharp from "sharp";
import { AppError } from "../errors/AppError";

@Service()
export class ImageResizeLogic {
  private imageRepository: ImageResizeRepository;

  constructor() {
    this.imageRepository = Container.get(ImageResizeRepository);
  }

  async execute({ height, imageName, width }: IImageFormatDTO) {
    const filePath = await this.imageRepository.find(imageName);

    if (!filePath.path) {
      throw new AppError("Image not found", 404);
    }

    const imageTest = await Sharp(filePath.path)
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
