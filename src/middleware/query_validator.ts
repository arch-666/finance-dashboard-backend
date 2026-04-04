import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validaterQueryMiddleware =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const input = schema.safeParse(req.query);
    console.log(input);
    if (!input.success) {
      res.status(400).json({ "wrong input schema": input });
    }
    req.validatedQueryData = input.data;
    next();
  };
