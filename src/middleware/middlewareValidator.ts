import { Request, Response, NextFunction } from "express";
import { NewReservationSchema } from "./zodValidator/reservation.schema";
import { ZodError, ZodSchema } from "zod";
import StatusCodes from "http-status-codes";
import { ErrorFactory, ErrorType } from "./errors/ErrorFactory";

export const validateBodySchema = (schema: ZodSchema) => {
  return  (req: Request,res:Response, next: NextFunction) => {

  try {
    req.body = schema.parse(req.body)
    next()
  } catch (error) {
    if(error instanceof ZodError){
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.issues.map(e =>({
          field: e.path.join("|"),
          message: e.message
        })
      )
      })
    }
    next(error)
  }
}
}

export const validateParamsSchema = (schema: ZodSchema) => {
  return  (req: Request,res:Response, next: NextFunction) => {

  try {
    schema.parse(req.params)
    next()
  } catch (error) {
    if(error instanceof ZodError){
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.issues.map(e =>({
          field: e.path.join("|"),
          message: e.message
        })
      )
      })
    }
    next(error)
  }
}
}

export const validateQuerySchema = (schema: ZodSchema) => {
  return  (req: Request,res:Response, next: NextFunction) => {

  try {
    schema.parse(req.query)
    next()
  } catch (error) {
    if(error instanceof ZodError){
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.issues.map(e =>({
          field: e.path.join("|"),
          message: e.message
        })
      )
      })
    }
    next(error)
  }
}
}