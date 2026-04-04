import { Request, Response } from "express";
import {
  categoryGroupedBalanceService,
  monthlyTrendService,
  netBalanceService,
  recentTransactionService,
  totalExpenseService,
  totalIncomeService,
  transactionSummaryService,
} from "./service.js";

export const totalIncomeController = async (req: Request, res: Response) => {
  const id = "40e99aee-0f74-4381-95d1-a07b3407bace";
  const income = await totalIncomeService(id);
  console.log("controller", income);
  res.status(200).json({ income: income });
};
export const totalExpenseController = async (req: Request, res: Response) => {
  const id = req.id as string;
  const expense = await totalExpenseService(id);
  res.status(200).json({ expense: expense });
};
export const netBalanceController = async (req: Request, res: Response) => {
  const id = req.id as string;
  const netBalance = await netBalanceService(id);
  res.status(200).json({ netBalance: netBalance });
};
export const categoryGroupedBalanceController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const categoryGroupedBalance = await categoryGroupedBalanceService(id);
  res.status(200).json({ categoryGroupedBalance: categoryGroupedBalance });
};
export const monthlyTrendController = async (req: Request, res: Response) => {
  const id = req.id as string;
  const monthlyTrend = await monthlyTrendService(id);
  res.status(200).json({ monthlyTrend: monthlyTrend });
};
export const transactionSummaryController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const transactionSummary = await transactionSummaryService(id);
  res.status(200).json({ transactionSummary: transactionSummary });
};
export const recentTransactionController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const recentTransaction = await recentTransactionService(id);
  res.status(200).json({ recentTransaction: recentTransaction });
};
