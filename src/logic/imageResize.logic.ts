import { Service, Container } from "typedi";
import { ImageResizeRepository } from "../repositories";
import { IImageFormatDTO } from "../dto/IImageFormatDTO";
import Sharp from "sharp";

@Service()
export class ImageResizeLogic {
  private imageRepository: ImageResizeRepository;

  constructor() {
    this.imageRepository = Container.get(ImageResizeRepository);
  }

  async execute({ height, imageName, width }: IImageFormatDTO) {
    const filePath = await this.imageRepository.find(imageName);

    const imageTest = await Sharp(filePath.path)
      .resize({
        width: width,
        height: height,
      })
      .toFormat("png")
      .toBuffer();

    const bufToString = imageTest.toString("base64");

    const html = `<html><body><img src='data:image/png;base64,${bufToString}'/></body></html>`;

    return html;
  }
}
