import prisma from "../../lib/prisma.js";
export const totalIncomeRepository = async (id) => {
    return await prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: { type: "INCOME" },
    });
};
export const totalExpenseRepository = async (id) => {
    return await prisma.financialRecord.aggregate({
        _sum: { amount: true },
        where: { type: "EXPENSE" },
    });
};
export const totalTransactionsRepository = async (id) => {
    return await prisma.financialRecord.findMany({});
};
export const categoryGroupedBalanceRepository = async (id) => {
    return await prisma.financialRecord.groupBy({
        by: ["category"],
        _sum: { amount: true },
    });
};
export const recentTransactionRepository = async (id) => {
    return await prisma.financialRecord.findMany({
        orderBy: { createAt: "desc" },
        take: 5,
    });
};
