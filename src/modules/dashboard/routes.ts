import express, { Request, Response } from "express";
import {
  categoryGroupedBalanceController,
  monthlyTrendController,
  netBalanceController,
  recentTransactionController,
  totalExpenseController,
  totalIncomeController,
  transactionSummaryController,
} from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { validaterParamsMiddleware } from "../../middleware/param_validator.js";
const dashboardRouter = express.Router();
dashboardRouter.get(
  "/income",
  authMiddleware(["ADMIN", "ANALYST"]),
  totalIncomeController,
);
dashboardRouter.get(
  "/check",
  authMiddleware(["VIEWER", "ADMIN", "ANALYST"]),
  (req: Request, res: Response) => {
    res.status(201).json({ hi: "hi" });
  },
);
dashboardRouter.get(
  "/expense",
  authMiddleware(["ADMIN", "ANALYST"]),
  totalExpenseController,
);
dashboardRouter.get(
  "/netBalance",
  authMiddleware(["ADMIN", "ANALYST"]),
  netBalanceController,
);
dashboardRouter.get(
  "/summary",
  authMiddleware(["ADMIN", "VIEWER", "ANALYST"]),
  transactionSummaryController,
);
dashboardRouter.get(
  "/recent",
  authMiddleware(["ADMIN", "ANALYST"]),
  recentTransactionController,
);
dashboardRouter.get(
  "/monthlyTrend",
  authMiddleware(["ADMIN", "ANALYST"]),
  monthlyTrendController,
);
dashboardRouter.get(
  "/categoryGroupedBalance",
  authMiddleware(["ADMIN", "ANALYST"]),
  categoryGroupedBalanceController,
);
export default dashboardRouter;
