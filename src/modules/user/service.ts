import { hasher } from "../../utils/hash.js";
import {
  changeUserStatusRepository,
  createUserRepository,
  getAllUserRepository,
  getUserRepository,
} from "./repository.js";
import { changeUserStatusType, createUserType } from "./schema.js";

export const createUserService = async (data: createUserType) => {
  const password = data.password;
  const hashedPassword = await hasher(password);
  data.password = hashedPassword;
  return await createUserRepository(data);
};

export const changeUserStatusService = async (
  id: string,
  data: changeUserStatusType,
) => {
  if (data.password) {
    const password = data.password;
    const hashedPassword = await hasher(password);
    data.password = hashedPassword;
  }
  return await changeUserStatusRepository(id, data);
};

export const getUserService = async (id: string) => {
  return await getUserRepository(id);
};
export const getAllUserService = async () => {
  return await getAllUserRepository();
};
