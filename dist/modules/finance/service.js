import { createFinancialRecordRepository, deleteFinancialRecordRepository, getFinancialRecordRepository, updateFinancialRecordRepository, } from "./repository.js";
export const createFinancialRecordService = async (data) => {
    return await createFinancialRecordRepository(data);
};
export const updateFinancialRecordService = async (id, data) => {
    return await updateFinancialRecordRepository(id, data);
};
export const deleteFinancialRecordService = async (id) => {
    return await deleteFinancialRecordRepository(id);
};
export const getFinancialRecordService = async (id) => {
    return await getFinancialRecordRepository(id);
};
