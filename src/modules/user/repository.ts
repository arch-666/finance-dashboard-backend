import prisma from "../../lib/prisma.js";
import { changeUserStatusType, createUserType } from "./schema.js";

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
export const changeUserStatusRepository = async (
  id: string,
  data: changeUserStatusType,
) => {
  return await prisma.user.update({
    where: { id: id },
    data: {
      isActive: data.isActive,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password,
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
