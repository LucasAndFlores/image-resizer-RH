import { Router } from "express";
import { imageResizeRouter } from "./imageResizer.route";

const router = Router();

router.use(imageResizeRouter);

export { router };
