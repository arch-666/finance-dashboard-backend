import { z } from "zod";
export const createFinancialRecordSchema = z.object({
    amount: z.float32(),
    type: z.literal(["INCOME", "EXPENSE"]),
    category: z.string(),
    date: z.coerce.date(),
    notes: z.string(),
});
export const updateFinancialRecordSchema = createFinancialRecordSchema.partial();
