import e, { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import { isNewExpression } from "typescript";
import {StatusCodes} from "http-status-codes";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { stringify } from "querystring";
import { BaseError } from "./errors/ExtendedError";
import { UserPayload } from "../@types/userPayload";
import { ErrorFactory, ErrorType } from "./errors/ErrorFactory";

dotenv.config();

const EXPIRES_IN_TOKEN : number =  3600; 
const ALGORITHM : jwt.Algorithm =  "RS256" as jwt.Algorithm;


const public_key_path = path.join(__dirname, "../../key/jwtRS256.key.pub");
const private_key_path = path.join(__dirname, "../../key/jwtRS256.key");

// lettura chiavi
const public_key = fs.readFileSync(public_key_path, "utf8");
const private_key = fs.readFileSync(private_key_path, "utf8");

export function errorHandler(err: Error, req : Request, res : Response , next: any) { 
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({"error": err.message});
  } else {
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error": "Internal Server Error Middleware"});
    }
  }

export var checkInputLogin = function(req:Request,res:Response,next:any){
    const { username, password } = req.body;
    /*
    if (!username || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username and password are required" });
    }
    */
    next();  
};

export var validateNewUser = function(req:Request,res:Response,next:any){
  const { username, password, email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username || !password || !email) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Username, password and email are required" });
  }
  if (!emailRegex.test(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email format" });
  }
  next();
};
   

function signJwt(payload: object): string {
  return jwt.sign(payload, private_key, {
    algorithm: ALGORITHM  || "RS256",
    expiresIn: EXPIRES_IN_TOKEN || 3600,
  });
}

export var detachToken = function(req : Request, res: Response){
    const payload = { 
        username: req.body.username,
        role: "admin"
     };
    const token = signJwt(payload);
    return res.status(StatusCodes.OK).json({
    message: "Login successful",
    token : token,
  });
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if(typeof authorization =='undefined'){
      throw ErrorFactory.getError(ErrorType.Unauthorized, "Token mancante");
    }
    if(!authorization.startsWith('Bearer ') || authorization.split(' ').length!==2){
      throw ErrorFactory.getError(ErrorType.Unauthorized, "Token malformato");
    }
    let out;
    try {
      let jwtToken = authorization.split(' ')[1];
      out = jwt.verify(jwtToken || '', public_key, { algorithms: [ALGORITHM] }) as UserPayload;
    } catch {
      throw ErrorFactory.getError(ErrorType.InvalidToken, "Token not valid");
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

/*
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ErrorFactory.getError(ErrorType.Unauthorized, "Token mancante o malformato");
    }

    const token = authHeader.split(" ")[1];

    // verifica token
    const payload = jwt.verify(token, public_key, { algorithms: [ALGORITHM] }) as UserPayload;

    // assegna l'utente a req
    req.user = payload;

    return next();
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      throw ErrorFactory.getError(ErrorType.Unauthorized, "Token scaduto");
    }
    if (err instanceof JsonWebTokenError || err instanceof NotBeforeError) {
      throw ErrorFactory.getError(ErrorType.Unauthorized, "Token non valido");
    }

    // errore inaspettato
    throw ErrorFactory.getError(ErrorType.InternalServerError);
  }
};


/*
export function checkToken(req : Request,res : Response,next: any){
  const bearerHeader = req.headers.authorization;
  console.log(bearerHeader);
  if(typeof bearerHeader!=='undefined'){
      const bearerToken = bearerHeader.split(' ')[1];
      req.token=bearerToken;
      next();
  }else{
      res.sendStatus(403);
  }
}

export function verifyAndAuthenticate(req: Request,res: Response,next: any){
  if (!req.token) {
    return res.sendStatus(403);
  }

  try {
    console.log(req.token);
    const decoded = jwt.verify(req.token, public_key, { algorithms: [ALGORITHM] });
    //req.user = decoded; // puoi anche salvare info decodificate su req.user
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
}
*/
