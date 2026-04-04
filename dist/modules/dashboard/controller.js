import { categoryGroupedBalanceService, monthlyTrendService, netBalanceService, recentTransactionService, totalExpenseService, totalIncomeService, transactionSummaryService, } from "./service.js";
export const totalIncomeController = async (req, res) => {
    const id = "40e99aee-0f74-4381-95d1-a07b3407bace";
    const income = await totalIncomeService(id);
    console.log("controller", income);
    res.status(201).json({ income: income });
};
export const totalExpenseController = async (req, res) => {
    const id = req.id;
    const expense = await totalExpenseService(id);
    res.status(201).json({ expense: expense });
};
export const netBalanceController = async (req, res) => {
    const id = req.id;
    const netBalance = await netBalanceService(id);
    res.status(201).json({ netBalance: netBalance });
};
export const categoryGroupedBalanceController = async (req, res) => {
    const id = req.id;
    const categoryGroupedBalance = await categoryGroupedBalanceService(id);
    res.status(201).json({ categoryGroupedBalance: categoryGroupedBalance });
};
export const monthlyTrendController = async (req, res) => {
    const id = req.id;
    const monthlyTrend = await monthlyTrendService(id);
    res.status(201).json({ monthlyTrend: monthlyTrend });
};
export const transactionSummaryController = async (req, res) => {
    const id = req.id;
    const transactionSummary = await transactionSummaryService(id);
    res.status(201).json({ transactionSummary: transactionSummary });
};
export const recentTransactionController = async (req, res) => {
    const id = req.id;
    const recentTransaction = await recentTransactionService(id);
    res.status(201).json({ recentTransaction: recentTransaction });
};
