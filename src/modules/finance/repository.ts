import prisma from "../../lib/prisma.js";
import {
  createFinancialRecordType,
  queryType,
  updateFinancialRecordType,
} from "./schema.js";
export const createFinancialRecordRepository = async (
  data: createFinancialRecordType,
) => {
  return await prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
      notes: data.notes,
    },
  });
};
export const updateFinancialRecordRepository = async (
  id: string,
  data: updateFinancialRecordType,
) => {
  return await prisma.financialRecord.update({
    where: { id: id },
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date,
      notes: data.notes,
    },
  });
};
export const deleteFinancialRecordRepository = async (id: string) => {
  return await prisma.financialRecord.delete({ where: { id: id } });
};
export const getFinancialRecordRepository = async (id: string) => {
  return await prisma.financialRecord.findUnique({
    where: { id: id },
  });
};
export const getFilteredFinancialRecordRepository = async (
  queryData: queryType,
) => {
  return await prisma.financialRecord.findMany({
    where: {
      type: queryData.type,
      category: queryData.category,
      amount: {
        gte: queryData.minAmount,
        lte: queryData.maxAmount,
      },
      date: {
        gte: queryData.minDate,
        lte: queryData.maxDate,
      },
    },
    orderBy: { date: "desc" },
  });
};
