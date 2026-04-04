import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import {
  createUserController,
  getAllUserController,
  getUserController,
} from "./controller.js";
import { createUserSchema } from "./schema.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validaterParamsMiddleware } from "../../middleware/param_validator.js";
const userRouter = express.Router();
userRouter.post(
  "/create",
  authMiddleware(["ADMIN"]),
  validatorMiddleware(createUserSchema),
  createUserController,
);
userRouter.get("/all", authMiddleware(["ADMIN"]), getAllUserController);
userRouter.get(
  "/:id",
  authMiddleware(["ADMIN"]),
  validaterParamsMiddleware,
  getUserController,
);
export default userRouter;
