import { z } from "zod";
export const registerUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.literal(["ADMIN", "ANALYST", "VIEWER"]),
  isActive: z.boolean(),
});
export type registerUserType = z.infer<typeof registerUserSchema>;
export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type loginUserType = z.infer<typeof loginUserSchema>;
