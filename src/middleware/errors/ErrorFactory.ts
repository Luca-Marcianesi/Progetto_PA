import {BaseError ,BadRequestError, NotFoundError,
    UnauthorizedError,ForbiddenError,InternalServerError, 
    UnknownError, InvaidTokenError, UserNotFounderror,
    EmailUsedError } from "./ExtendedError";
import { StatusCodes } from "http-status-codes";

export enum ErrorType {
    NotFound,
    BadRequest ,
    Unauthorized,
    Forbidden ,
    InternalServer,
    InvalidToken,
    UserNotFound,
    Unknown,
    EmailUsed

}

export class ErrorFactory {
    static getError(type: ErrorType, message?: string): BaseError {

        switch (type) {
            case ErrorType.NotFound:
                return new NotFoundError(message);
            case ErrorType.BadRequest:
                return new BadRequestError(message );
            case ErrorType.Unauthorized:
                return new UnauthorizedError(message);
            case ErrorType.Forbidden:
                return new ForbiddenError(message);
            case ErrorType.InternalServer:
                return new  InternalServerError(message);
            case ErrorType.InvalidToken:
                return new InvaidTokenError(message);
            case ErrorType.UserNotFound:
                return new UserNotFounderror(message);
            case ErrorType.EmailUsed:
                return new EmailUsedError(message);
            default:
                return new UnknownError(message);
        }
    }
}