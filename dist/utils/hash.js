import bcrypt from "bcrypt";
export const hasher = async (data) => {
    return bcrypt.hash(data, 10);
};
export const compareHash = async (password, passwordHashed) => {
    return await bcrypt.compare(password, passwordHashed);
};
