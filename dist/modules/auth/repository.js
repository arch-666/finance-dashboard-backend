import prisma from "../../lib/prisma.js";
export const registerUserRepository = async (data) => {
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
export const loginUserRepository = async (data) => {
    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });
    return user;
};
