import errorMessage from "../errors/error";
import { body } from "express-validator";

const validator = {
  validatePost: () => {
    return [
      body("title")
        .trim()
        .notEmpty()
        .withMessage(errorMessage.requiredErr("title"))
        .isLength({ max: 255 })
        .withMessage(errorMessage.lengthMaxErr("Title", 255)),
      body("content")
        .trim()
        .isLength({ max: 500 })
        .withMessage(errorMessage.lengthMaxErr("Post", 500)), // remo
    ];
  },
};

export default validator;
