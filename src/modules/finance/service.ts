import {
  createFinancialRecordRepository,
  deleteFinancialRecordRepository,
  getFinancialRecordRepository,
  updateFinancialRecordRepository,
} from "./repository.js";
import {
  createFinancialRecordType,
  updateFinancialRecordType,
} from "./schema.js";

export const createFinancialRecordService = async (
  data: createFinancialRecordType,
) => {
  return await createFinancialRecordRepository(data);
};
export const updateFinancialRecordService = async (
  id: string,
  data: updateFinancialRecordType,
) => {
  return await updateFinancialRecordRepository(id, data);
};
export const deleteFinancialRecordService = async (id: string) => {
  return await deleteFinancialRecordRepository(id);
};
export const getFinancialRecordService = async (id: string) => {
  return await getFinancialRecordRepository(id);
};
