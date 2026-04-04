import express from "express";
import { validatorMiddleware } from "../../middleware/validator.js";
import {
  createFinancialRecordSchema,
  querySchema,
  updateFinancialRecordSchema,
} from "./schema.js";
import {
  createFinancialRecordController,
  deleteFinancialRecordController,
  getFilteredFinancialRecordController,
  getFinancialRecordController,
  updateFinancialRecordController,
} from "./controller.js";
import { validaterParamsMiddleware } from "../../middleware/param_validator.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validaterQueryMiddleware } from "../../middleware/query_validator.js";
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
  "/filter",
  authMiddleware(["ADMIN", "VIEWER", "ANALYST"]),
  validaterQueryMiddleware(querySchema),
  getFilteredFinancialRecordController,
);
financialRecordRouter.get(
  "/:id",
  authMiddleware(["ADMIN", "VIEWER", "ANALYST"]),
  validaterQueryMiddleware(querySchema),
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
