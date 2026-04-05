import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import {
  changeUserStatusController,
  createUserController,
  getAllUserController,
  getUserController,
} from "./controller.js";
import { changeUserStatusSchema, createUserSchema } from "./schema.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validaterParamsMiddleware } from "../../middleware/param_validator.js";
const userRouter = express.Router();
userRouter.post(
  "/create",
  authMiddleware(["ADMIN"]),
  validatorMiddleware(createUserSchema),
  createUserController,
);
userRouter.patch(
  "/:id",
  authMiddleware(["ADMIN"]),
  validaterParamsMiddleware,
  validatorMiddleware(changeUserStatusSchema),
  changeUserStatusController,
);
userRouter.get("/all", authMiddleware(["ADMIN"]), getAllUserController);
userRouter.get(
  "/:id",
  authMiddleware(["ADMIN"]),
  validaterParamsMiddleware,
  getUserController,
);
export default userRouter;
