import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/serviceInterface/IUserService";
import { UserPayload } from "../@types/userPayload";
import { DomainUser } from "../domain/user";
import { UpdateTokenInput, UpdateTokenSchema } from "../middleware/zodValidator/user.schema";

export class UserController {
  constructor(private UserService : IUserService) {}

  login = async (req: Request, res: Response, next: any) => {

    try{
      const {email, password} = req.body
      const user : DomainUser = await this.UserService.login(email,password)

      // enhance the payload and add it to the request
      let payload : UserPayload = {
        id: user.id,
        email: user.email,
        role: user.role
      }
      req.user = payload
      next()
    }
    catch(err){
      throw err
    }  
    
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, surname, email, password } = req.body;
      const user = await this.UserService.createUser({ name, surname, email, password });
      return res.status(StatusCodes.CREATED).json({message: "utente creato con Id con email" + user.email });
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
      let inputValidated = req.query as unknown as UpdateTokenInput
      await this.UserService.addTokenToUser(inputValidated.email, inputValidated.token);
      return res.status(StatusCodes.OK).json({ message: "Token updated successfully" });
    } catch (error) {
      next(error);
    }
  };


}



