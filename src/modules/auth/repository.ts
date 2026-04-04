import prisma from "../../lib/prisma.js";
import { loginUserType } from "./schema.js";
export const loginUserRepository = async (data: loginUserType) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  return user;
};
