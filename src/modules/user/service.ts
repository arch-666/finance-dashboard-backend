import { hasher } from "../../utils/hash.js";
import {
  createUserRepository,
  getAllUserRepository,
  getUserRepository,
} from "./repository.js";
import { createUserType } from "./schema.js";

export const createUserService = async (data: createUserType) => {
  const password = data.password;
  const hashedPassword = await hasher(password);
  data.password = hashedPassword;
  return await createUserRepository(data);
};
export const getUserService = async (id: string) => {
  return await getUserRepository(id);
};
export const getAllUserService = async () => {
  return await getAllUserRepository();
};
