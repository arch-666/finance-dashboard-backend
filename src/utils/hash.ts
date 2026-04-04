import bcrypt from "bcrypt";
export const hasher = async (data: string) => {
  return bcrypt.hash(data, 10);
};
export const compareHash = async (password: string, passwordHashed: string) => {
  return await bcrypt.compare(password, passwordHashed);
};
