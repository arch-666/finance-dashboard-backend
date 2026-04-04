import prisma from "../../lib/prisma.js";
import {
  createFinancialRecordType,
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
