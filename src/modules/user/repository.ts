import prisma from "../../lib/prisma.js";
import { createUserType } from "./schema.js";

export const createUserRepository = async (data: createUserType) => {
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
export const getUserRepository = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};
export const getAllUserRepository = async () => {
  return await prisma.user.findMany();
};
