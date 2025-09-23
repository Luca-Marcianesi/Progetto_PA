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
    ReservationNotFound,
    ResourceNotFound,
    ResourceUsed,
    ReservationCancelled,
    ReservationInvalid,
    AlredyRejectedReservation,
    AlredyApprovedReservation,
    ReservationActiveInCalendar
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
            case ErrorType.ResourceNotFound:
                return new Errors.ResourceNotFoundError()
            case ErrorType.ResourceUsed:
                return new Errors.ResourceUsedError()
            case ErrorType.AlredyApprovedReservation:
                return new Errors.AlredyApprovedReservationError()
            case ErrorType.AlredyRejectedReservation:
                return new Errors.AlredyRejectedReservationError()
            case ErrorType.ReservationInvalid:
                return new Errors.ReservationInvalidError()
            case ErrorType.ReservationCancelled:
                return new Errors.ReservationCancelledError()
            case ErrorType.ReservationActiveInCalendar:
                return new Errors.ReservationActiveInCalendarError()
            default:
                return new Errors.InternalServerError();
        }
    }
}