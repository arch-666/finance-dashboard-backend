import { z } from "zod";
export const createUserSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.literal(["ADMIN", "ANALYST", "VIEWER"]),
  isActive: z.boolean(),
});
export type createUserType = z.infer<typeof createUserSchema>;
