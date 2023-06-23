import "reflect-metadata";
import { ImageResizeLogic } from "./";
import { AppError } from "../errors/AppError";
import { ImageResizeRepository } from "../repositories";

let imageResizeLogic: ImageResizeLogic;
let imageResizeRepository: ImageResizeRepository;

describe("Image resize logic", () => {
  beforeEach(() => {
    imageResizeRepository = new ImageResizeRepository();
    imageResizeLogic = new ImageResizeLogic(imageResizeRepository);
  });

  it("Should be able to generate resized image", async () => {
    const params = {
      imageName: "brno3",
      width: 500,
      height: 500,
    };

    const result = await imageResizeLogic.execute({
      imageName: params.imageName,
      width: params.width,
      height: params.height,
    });

    expect(typeof result).toBe("string");
  });

  it("Should not be able to generate a new image if there isn't one", async () => {
    expect(async () => {
      const params = {
        imageName: "brno5",
        width: 500,
        height: 500,
      };

      const result = await imageResizeLogic.execute({
        imageName: params.imageName,
        width: params.width,
        height: params.height,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
