import { Request } from "express"
import { ErrorFactory } from "../middleware/errors/errorFactory"
import { ErrorType } from "../middleware/errors/errorFactory"

export function getUtenteId(req: Request): number{
        if(!req.user) throw ErrorFactory.getError(ErrorType.Unauthorized)
        
        return req.user.id
    }