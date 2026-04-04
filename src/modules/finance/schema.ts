import { z } from "zod";
export const createFinancialRecordSchema = z.object({
  amount: z.float32(),
  type: z.literal(["INCOME", "EXPENSE"]),
  category: z.string(),
  date: z.coerce.date(),
  notes: z.string(),
});
export type createFinancialRecordType = z.infer<
  typeof createFinancialRecordSchema
>;
export const querySchema = z.object({
  type: z.literal(["INCOME", "EXPENSE"]).optional(),
  category: z.string().optional(),
  minDate: z.preprocess((val) => {
    if (typeof val === "string" && !isNaN(Date.parse(val))) {
      return new Date(val);
    }
    return val;
  }, z.date().optional()),
  maxDate: z.preprocess((val) => {
    if (typeof val === "string" && !isNaN(Date.parse(val)))
      return new Date(val);
    return val;
  }, z.date().optional()),
  minAmount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val);
    }
    return val;
  }, z.number().optional()),
  maxAmount: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number(val);
    }
    return val;
  }, z.number().optional()),
});
export type queryType = z.infer<typeof querySchema>;
export const updateFinancialRecordSchema =
  createFinancialRecordSchema.partial();
export type updateFinancialRecordType = z.infer<
  typeof updateFinancialRecordSchema
>;
