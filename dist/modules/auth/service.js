import { compareHash, hasher } from "../../utils/hash.js";
import { tokenizer } from "../../utils/jwt.js";
import { loginUserRepository, registerUserRepository } from "./repository.js";
export const registerUserService = async (data) => {
    const password = data.password;
    const hashedPassword = await hasher(password);
    data.password = hashedPassword;
    return await registerUserRepository(data);
};
export const loginUserService = async (data) => {
    const user = await loginUserRepository(data);
    if (!user) {
        return {};
    }
    const isAuthenticated = await compareHash(data.password, user.password);
    if (isAuthenticated) {
        const token = tokenizer(user.id);
        return token;
    }
    else {
        return { message: "unauthorized" };
    }
};
