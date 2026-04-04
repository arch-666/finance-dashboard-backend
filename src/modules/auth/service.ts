import { compareHash } from "../../utils/hash.js";
import { tokenizer } from "../../utils/jwt.js";
import { loginUserRepository } from "./repository.js";
import { loginUserType } from "./schema.js";

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
