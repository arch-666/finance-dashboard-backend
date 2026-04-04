import jwt from "jsonwebtoken";
export const tokenizer = (payload) => {
    return jwt.sign({ user_id: payload }, "secret", { expiresIn: "1h" });
};
export const verifier = (token) => {
    return jwt.verify(token, "secret");
};
