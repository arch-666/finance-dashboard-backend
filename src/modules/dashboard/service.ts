import {
  categoryGroupedBalanceRepository,
  recentTransactionRepository,
  totalExpenseRepository,
  totalIncomeRepository,
  totalTransactionsRepository,
} from "./repository.js";

export const totalIncomeService = async (id: string) => {
  const income = await totalIncomeRepository(id);
  console.log(income);
  return income._sum.amount;
};
export const totalExpenseService = async (id: string) => {
  const expense = await totalExpenseRepository(id);
  console.log(expense);
  return expense._sum.amount;
};
export const categoryGroupedBalanceService = async (id: string) => {
  const categoryWiseSum = await categoryGroupedBalanceRepository(id);
  console.log(categoryWiseSum);
  return categoryWiseSum;
};
export const netBalanceService = async (id: string) => {
  const income = await totalIncomeRepository(id);
  console.log(income);
  const expense = await totalExpenseRepository(id);
  console.log(expense);
  return (income._sum.amount || 0) - (expense._sum.amount || 0);
};
export const monthlyTrendService = async (id: string) => {
  const totalTransactions = await totalTransactionsRepository(id);
  type monthlyStats = { income: number; expense: number };
  const monthlyData: Record<number, monthlyStats> = {};
  totalTransactions.forEach((transaction) => {
    const month = transaction.createAt.getMonth();
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (transaction.type === "INCOME") {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expense += transaction.amount;
    }
  });
  return monthlyData;
};
export const recentTransactionService = async (id: string) => {
  return await recentTransactionRepository(id);
};

export const transactionSummaryService = async (id: string) => {
  const income = await totalIncomeRepository(id);
  console.log(income);
  const expense = await totalExpenseRepository(id);
  console.log(expense);
  return {
    totalIncome: income._sum.amount || 0,
    totalExpense: expense._sum.amount || 0,
    netBalance: (income._sum.amount || 0) - (expense._sum.amount || 0),
  };
};
