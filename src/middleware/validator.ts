import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validatorMiddleware =
  <T>(schema: z.ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const input = schema.safeParse(req.body);
    if (!input.success) {
      res.status(400).json({ "Wrong input schema": input });
    }
    req.validatedData = input.data;
    next();
  };
