import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
export interface CustomJwtPayload extends JwtPayload {
  user_id: string;
}
export const tokenizer = (payload: string) => {
  return jwt.sign({ user_id: payload }, "secret", { expiresIn: "1h" });
};
export const verifier = (token: string) => {
  return jwt.verify(token, "secret");
};
