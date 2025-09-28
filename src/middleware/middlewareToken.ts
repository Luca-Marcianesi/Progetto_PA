import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { BaseError } from "./errors/extendedEor";
import { UserPayload } from "../@types/userPayload";
import { ErrorFactory, ErrorType } from "./errors/errFactory";

dotenv.config();

const EXPIRES_IN_TOKEN : number =  3600;  //1h
const ALGORITHM : jwt.Algorithm =  "RS256" as jwt.Algorithm;


const public_key_path = path.join(__dirname, "../../key/jwtRS256.key.pub");
const private_key_path = path.join(__dirname, "../../key/jwtRS256.key");

// lettura chiavi
const public_key = fs.readFileSync(public_key_path, "utf8");
const private_key = fs.readFileSync(private_key_path, "utf8");

   

function signJwt(payload: object): string {
  return jwt.sign(payload, private_key, {
    algorithm: ALGORITHM  || "RS256",
    expiresIn: EXPIRES_IN_TOKEN || 3600, // 1h
  });
}


export var detachToken = function(req : Request, res: Response){
  try{
    const payload = req.user
    const token = signJwt(payload);
    return res.status(StatusCodes.OK).json({message: "Login successful",token : token});

  }catch(err){
    throw err
  }
    
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if(typeof authorization =='undefined'){
      throw ErrorFactory.getError(ErrorType.Unauthorized);
    }
    if(!authorization.startsWith('Bearer ') || authorization.split(' ').length!==2){
      throw ErrorFactory.getError(ErrorType.Unauthorized);
    }
    let out;
    try {
      let jwtToken = authorization.split(' ')[1];
      out = jwt.verify(jwtToken || '', public_key, { algorithms: [ALGORITHM] }) as UserPayload;
    } catch {
      throw ErrorFactory.getError(ErrorType.InvalidToken);
    }
    req.user = out;
    next();

  }catch (err: any) {
      if (err instanceof BaseError) {
        throw err;
      }else {
       throw ErrorFactory.getError(ErrorType.InternalServer);
    }
  }
};


// Check if the role in the UserPayload is in the array given
export const authenticate = (roles: string[])=>{
  return (req: Request, res: Response, next: NextFunction)=>{
    if(!req.user || !roles.includes(req.user.role)){
      throw ErrorFactory.getError(ErrorType.Unauthorized);
    }
    next()

  }


}
