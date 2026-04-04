import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import {
  createFinancialRecordSchema,
  updateFinancialRecordSchema,
} from "./schema.js";
import {
  createFinancialRecordController,
  deleteFinancialRecordController,
  getFinancialRecordController,
  updateFinancialRecordController,
} from "./controller.js";
import { validaterParamsMiddleware } from "../../middleware/param_validator.js";
import { authMiddleware } from "../../middleware/auth.js";
const financialRecordRouter = express.Router();
financialRecordRouter.post(
  "/",
  authMiddleware(["ADMIN"]),
  validatorMiddleware(createFinancialRecordSchema),
  createFinancialRecordController,
);

financialRecordRouter.patch(
  "/:id",
  authMiddleware(["ADMIN"]),
  validaterParamsMiddleware,
  validatorMiddleware(updateFinancialRecordSchema),
  updateFinancialRecordController,
);

financialRecordRouter.get(
  "/:id",
  authMiddleware(["ADMIN", "VIEWER", "ANALYST"]),
  validaterParamsMiddleware,
  getFinancialRecordController,
);

financialRecordRouter.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  validaterParamsMiddleware,
  deleteFinancialRecordController,
);

export default financialRecordRouter;
