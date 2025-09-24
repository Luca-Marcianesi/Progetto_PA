import { NextFunction, Request,Response } from "express";

import { UserRepository } from "../repository/UserRepository";
import { ErrorFactory, ErrorType } from "./errors/ErrorFactory";
import { UserDAO } from "../dao/userDAO";

export var verifyUserTkens = async function(req: Request,res : Response, next: NextFunction){
    let user_dao = new UserDAO()
    if(req.user === undefined) throw ErrorFactory.getError(ErrorType.InvalidToken)

    let user = await user_dao.getUserById(req.user.id)

    if(user === null) throw ErrorFactory.getError(ErrorType.UserNotFound)

    if(user.token === 0) throw ErrorFactory.getError(ErrorType.TooLessToken)

    next()


}