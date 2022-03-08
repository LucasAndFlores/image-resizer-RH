import { ImageResizeLogic } from "./";
import "reflect-metadata";
import { AppError } from "../errors/AppError";

let imageResizeLogic: ImageResizeLogic;

describe("Image resize logic", () => {
  beforeEach(() => {
    imageResizeLogic = new ImageResizeLogic();
  });

  it("Should be able to generate resized image", async () => {
    const params = {
      imageName: "docker1",
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

  it("Should be able to generate resized image with cache returned", async () => {
    const params = {
      imageName: "brno3",
      width: 500,
      height: 500,
      dirPath: "/usr/app/dist/imgs/brno3.jpg",
    };

    const result = await imageResizeLogic.execute({
      imageName: params.imageName,
      width: params.width,
      height: params.height,
      dirPath: params.dirPath,
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
