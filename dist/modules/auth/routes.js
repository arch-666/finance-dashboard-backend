import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import { loginUserSchema, registerUserSchema } from "./schema.js";
import { loginUserController, registerUserController } from "./controller.js";
const authRouter = express.Router();
authRouter.post("/register", validatorMiddleware(registerUserSchema), registerUserController);
authRouter.post("/login", validatorMiddleware(loginUserSchema), loginUserController);
export default authRouter;
