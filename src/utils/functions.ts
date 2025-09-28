import { Request } from "express"
import { ErrorFactory } from "../middleware/errors/errFactory"
import { ErrorType } from "../middleware/errors/errFactory"

export function getUtenteId(req: Request): number{
        if(!req.user) throw ErrorFactory.getError(ErrorType.Unauthorized)
        
        return req.user.id
    }