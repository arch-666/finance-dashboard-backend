import prisma from "../../lib/prisma.js";
export const createFinancialRecordRepository = async (data) => {
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
export const updateFinancialRecordRepository = async (id, data) => {
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
export const deleteFinancialRecordRepository = async (id) => {
    return await prisma.financialRecord.delete({ where: { id: id } });
};
export const getFinancialRecordRepository = async (id) => {
    return await prisma.financialRecord.findUnique({
        where: { id: id },
    });
};
