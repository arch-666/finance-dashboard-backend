import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validaterParamsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.params);
  const schema = z.string().uuid();
  const input = schema.safeParse(req.params.id);
  console.log(input);
  if (!input.success) {
    res.status(400).json({ "wrong input schema": input });
  }
  console.log("validate params middleware", input);
  req.id = input.data;
  next();
};
