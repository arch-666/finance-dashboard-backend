import express from "express";
import { categoryGroupedBalanceController, monthlyTrendController, netBalanceController, recentTransactionController, totalExpenseController, totalIncomeController, transactionSummaryController, } from "./controller.js";
import { authMiddleware } from "../../middleware/auth.js";
const dashboardRouter = express.Router();
dashboardRouter.get("/income", totalIncomeController);
dashboardRouter.get("/check", authMiddleware(["VIEWER", "ADMIN", "ANALYST"]), (req, res) => {
    res.status(201).json({ hi: "hi" });
});
dashboardRouter.get("/expense", totalExpenseController);
dashboardRouter.get("/netBalance", netBalanceController);
dashboardRouter.get("/summary", transactionSummaryController);
dashboardRouter.get("/recent", recentTransactionController);
dashboardRouter.get("/monthlyTrend", monthlyTrendController);
dashboardRouter.get("/categoryGroupedBalance", categoryGroupedBalanceController);
export default dashboardRouter;
