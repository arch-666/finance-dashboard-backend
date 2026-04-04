import { Request, Response } from "express";
import { loginUserType, registerUserType } from "./schema.js";
import { loginUserService, registerUserService } from "./service.js";

export const registerUserController = async (req: Request, res: Response) => {
  const inputData = req.validatedData as registerUserType;
  const user = await registerUserService(inputData);
  res.status(201).json({ user: user });
};
export const loginUserController = async (req: Request, res: Response) => {
  const inputData = req.validatedData as loginUserType;
  const token = await loginUserService(inputData);
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000,
  });

  res.status(201).json({ message: "login successful" });
};
