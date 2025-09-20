import * as Errors from "./ExtendedError";
import { StatusCodes } from "http-status-codes";

export enum ErrorType {
    NotFound,
    BadRequest ,
    Unauthorized,
    Forbidden ,
    InternalServer,
    InvalidToken,
    UserNotFound,
    EmailUsed,
    InvalidReservaion,
    CalNotExist,
    SlotNotInCal,
    SlotUsed,
    TooLessToken,
    LoginFail,
    ReservationNotFound



}

export class ErrorFactory {
    static getError(type: ErrorType): Errors.BaseError {

        switch (type) {
            case ErrorType.NotFound:
                return new Errors.NotFoundError();
            case ErrorType.BadRequest:
                return new Errors.BadRequestError();
            case ErrorType.Unauthorized:
                return new Errors.UnauthorizedError();
            case ErrorType.Forbidden:
                return new Errors.ForbiddenError();
            case ErrorType.InvalidToken:
                return new Errors.InvaidTokenError();
            case ErrorType.UserNotFound:
                return new Errors.UserNotFoundError();
            case ErrorType.EmailUsed:
                return new Errors.EmailUsedError();
            case ErrorType.InvalidReservaion:
                return new Errors.InvalidReservaionError();
            case ErrorType.CalNotExist:
                return new Errors.CalendarNotExistError();
            case ErrorType.SlotNotInCal:
                return new Errors.SlotNotInCalError();
            case ErrorType.SlotUsed:
                return new Errors.SlotUsedError();
            case ErrorType.TooLessToken:
                return new Errors.TooLessTokenError();
            case ErrorType.LoginFail:
                return new Errors.LoginFailError()
            case ErrorType.ReservationNotFound:
                return new Errors.ReservationNotFoundError()
            default:
                return new Errors.InternalServerError();
        }
    }
}