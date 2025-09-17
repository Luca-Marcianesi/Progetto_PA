import { NextFunction, Request, Response } from "express";
import { isNewExpression } from "typescript";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/serviceInterface/IUserService";

export class UserController {
  constructor(private UserService : IUserService) {}

 
  login = async (req: Request, res: Response, next: any) => {
    const { username, password } = req.body;
    /*
    if (! await this.userService.checkCredentials(username, password)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
      */
    next();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, surname, email, password } = req.body;
      const userId = await this.UserService.createUser({ name, surname, email, password });
      return res.status(StatusCodes.CREATED).json({message: "utente creato con Id" + userId });
    } catch (error) {
      
      next(error);
    }
  };

  getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const user = await this.UserService.getUserByEmail(email);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  updateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = req.params.email;
      const { token } = req.body;
      await this.UserService.addTokenToUser(email, token);
      return res.status(StatusCodes.OK).json({ message: "Token updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  auth = async (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).json({ message: "Auth successful" });
  }


}



