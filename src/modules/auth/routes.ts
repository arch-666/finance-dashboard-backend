import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import { loginUserSchema } from "./schema.js";
import { loginUserController } from "./controller.js";
const authRouter = express.Router();

authRouter.post(
  "/login",
  validatorMiddleware(loginUserSchema),
  loginUserController,
);

export default authRouter;
