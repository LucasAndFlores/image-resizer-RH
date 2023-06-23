import "reflect-metadata";
import request from "supertest";
import { app } from "../app";

describe("Image Resize Controller", () => {
  it("Should be able to resize image with right parameters", async () => {
    await request(app).get("/resize/brno3/200/400").expect(200);
  });

  it("Should be able to resize image with right parameters and with cache", async () => {
    await request(app).get("/resize/brno3/200/400");
    const resultWithCache = await request(app).get("/resize/brno3/200/400");
    expect(resultWithCache.statusCode).toBe(200);
  });

  it("Should not be able to resize image with negative numbers in width and height", async () => {
    await request(app).get("/resize/brno3/-200/-400").expect(422);
  });

  it("Should not be able to resize image without a name", async () => {
    await request(app).get("/resize/200/400").expect(404);
  });

  it("Should not be able to resize image if there isn't one", async () => {
    await request(app).get("/resize/brno10/200/400").expect(404);
  });
});
