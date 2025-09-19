// middlewares/validate.ts
import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // parse lancia un errore se i dati non rispettano lo schema
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        errors: error.errors ?? error.message,
      });
    }
  };
