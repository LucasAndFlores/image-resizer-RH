import Joi from "joi";
import { SchemaValidator } from "../validation";

const imageResize = Joi.object()
  .keys({
    imageName: Joi.string().min(1).required(),
    width: Joi.number().integer().min(1).required(),
    height: Joi.number().integer().min(1).required(),
  })
  .meta({ className: "imageResize" });

export class ImageResizeValidator {
  private static params = imageResize;

  static get(): SchemaValidator {
    return {
      params: this.params,
    };
  }
}
