import { Request, Response } from "express";
import { createUserType } from "./schema.js";
import {
  changeUserStatusService,
  createUserService,
  getAllUserService,
  getUserService,
} from "./service.js";

export const createUserController = async (req: Request, res: Response) => {
  const inputData = req.validatedData as createUserType;
  const user = await createUserService(inputData);
  res.status(201).json({ user: user });
};

export const changeUserStatusController = async (
  req: Request,
  res: Response,
) => {
  const id = req.id as string;
  const inputData = req.validatedData as createUserType;
  const user = await changeUserStatusService(id, inputData);
  res.status(201).json({ user: user });
};

export const getUserController = async (req: Request, res: Response) => {
  const id = req.id as string;
  const user = await getUserService(id);
  res.status(200).json({ user: user });
};

export const getAllUserController = async (req: Request, res: Response) => {
  const user = await getAllUserService();
  res.status(200).json({ user: user });
};
