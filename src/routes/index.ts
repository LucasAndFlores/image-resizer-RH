import { Router } from "express";
import { imageResizeRouter } from "./imageResizer.route";

export const getRoutes = () => {
  const router = Router();

  router.use(imageResizeRouter());

  return router;
};
