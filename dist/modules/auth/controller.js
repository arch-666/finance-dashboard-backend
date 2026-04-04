import { loginUserService, registerUserService } from "./service.js";
export const registerUserController = async (req, res) => {
    const inputData = req.validatedData;
    const user = await registerUserService(inputData);
    res.status(201).json({ user: user });
};
export const loginUserController = async (req, res) => {
    const inputData = req.validatedData;
    const token = await loginUserService(inputData);
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000,
    });
    res.status(201).json({ message: "login successful" });
};
