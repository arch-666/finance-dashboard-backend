import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validaterParamsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = z.string().uuid();
  const input = schema.safeParse(req.params.id);
  if (!input.success) {
    res.status(400).json({ "wrong input schema": input });
  }
  req.id = input.data;
  next();
};
