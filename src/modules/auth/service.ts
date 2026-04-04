import { compareHash, hasher } from "../../utils/hash.js";
import { tokenizer, verifier } from "../../utils/jwt.js";
import { loginUserRepository, registerUserRepository } from "./repository.js";
import { loginUserType, registerUserType } from "./schema.js";

export const registerUserService = async (data: registerUserType) => {
  const password = data.password;
  const hashedPassword = await hasher(password);
  data.password = hashedPassword;
  return await registerUserRepository(data);
};
export const loginUserService = async (data: loginUserType) => {
  const user = await loginUserRepository(data);
  if (!user) {
    return {};
  }
  const isAuthenticated = await compareHash(data.password, user.password);
  if (isAuthenticated) {
    const token = tokenizer(user.id);
    return token;
  } else {
    return { message: "unauthorized" };
  }
};
