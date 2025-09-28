import { Request, Response,NextFunction } from "express";
import { BaseError } from "./errors/extendedEor";
import { StatusCodes } from "http-status-codes";

export function errorHandler(err: Error, req : Request, res : Response , next: any) { 
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({"error": err.message});
  } else {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": "Internal Server Error Middleware"});
    }
  }