import { Request, Response } from "express";
import {
  createFinancialRecordType,
  updateFinancialRecordType,
} from "./schema.js";
import {
  createFinancialRecordService,
  deleteFinancialRecordService,
  getFinancialRecordService,
  updateFinancialRecordService,
} from "./service.js";

export const createFinancialRecordController = async (
  req: Request,
  res: Response,
) => {
  const inputData = req.validatedData as createFinancialRecordType;
  const financialRecord = await createFinancialRecordService(inputData);
  res.status(200).json({ financialRecord: financialRecord });
};
export const updateFinancialRecordController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const inputData = req.validatedData as updateFinancialRecordType;
  const financialRecord = await updateFinancialRecordService(id, inputData);
  res.status(200).json({ financialRecord: financialRecord });
};
export const deleteFinancialRecordController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const financialRecord = await deleteFinancialRecordService(id);
  res.status(200).json({ financialRecord: financialRecord });
};
export const getFinancialRecordController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const financialRecord = await getFinancialRecordService(id);
  res.status(200).json({ financialRecord: financialRecord });
};
