import { Request, Response } from "express";
import { loginUserType } from "./schema.js";
import { loginUserService } from "./service.js";

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
