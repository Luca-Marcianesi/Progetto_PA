import { Request } from "express"
import { ErrorFactory } from "../middleware/errors/ErrorFactory"
import { ErrorType } from "../middleware/errors/ErrorFactory"

export function getUtenteId(req: Request): number{
        if(!req.user) throw ErrorFactory.getError(ErrorType.Unauthorized)
        
        return req.user.id
    }