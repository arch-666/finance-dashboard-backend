import { createFinancialRecordService, deleteFinancialRecordService, getFinancialRecordService, updateFinancialRecordService, } from "./service.js";
export const createFinancialRecordController = async (req, res) => {
    const inputData = req.validatedData;
    const financialRecord = await createFinancialRecordService(inputData);
    res.status(201).json({ financialRecord: financialRecord });
};
export const updateFinancialRecordController = async (req, res) => {
    const id = req.id;
    const inputData = req.validatedData;
    const financialRecord = await updateFinancialRecordService(id, inputData);
    console.log(financialRecord);
    res.status(201).json({ financialRecord: financialRecord });
};
export const deleteFinancialRecordController = async (req, res) => {
    const id = req.id;
    const financialRecord = await deleteFinancialRecordService(id);
    res.status(201).json({ financialRecord: financialRecord });
};
export const getFinancialRecordController = async (req, res) => {
    const id = req.id;
    console.log("controller", id);
    const financialRecord = await getFinancialRecordService(id);
    res.status(201).json({ financialRecord: financialRecord });
};
