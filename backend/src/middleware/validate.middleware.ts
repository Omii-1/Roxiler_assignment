import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";

export const validate = (schema: ZodTypeAny) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body); 
    next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
