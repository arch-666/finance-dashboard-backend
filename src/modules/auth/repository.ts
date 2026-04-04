import prisma from "../../lib/prisma.js";
import { loginUserType, registerUserType } from "./schema.js";

export const registerUserRepository = async (data: registerUserType) => {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    },
  });
};
export const loginUserRepository = async (data: loginUserType) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  return user;
};
