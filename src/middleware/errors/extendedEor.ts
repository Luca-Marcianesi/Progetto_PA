import { StatusCodes } from "http-status-codes";

export class BaseError  extends Error {

    message: string;
    statusCode: StatusCodes;

    constructor(statusCode : StatusCodes ,message?: string) {
        super(message);
        this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        this.message = message || "Errore generico";
    }

    getMessage = (): string => this.message;

    getStatusCode = (): StatusCodes => this.statusCode;
    
}

// Errori generici

export class NotFoundError extends BaseError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND , message || "Risorsa non trovata");
    }
}

export class ForbiddenError extends BaseError  {
    constructor(message?: string) {
        super(StatusCodes.FORBIDDEN , message || "Accesso negato");
    }
}

export class BadRequestError extends BaseError {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST , message || "Richiesta non valida");
    }
}

export class UnauthorizedError  extends BaseError  {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED , message || "Non autorizzato");
    }
}

export class InternalServerError extends BaseError  {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR , message || "Errore interno del server");
    }   
}

export class ConflictError extends BaseError  {
    constructor(message?: string) {
        super(StatusCodes.CONFLICT , message || "Conflitto");
    }   
}


// Errori specifici che erediano lo status code dai generici

export class InvalidReservaionError extends BadRequestError{
    constructor(){
        super("Prenotazione non valida")
    }
}

export class ReservationAfterNewEndError extends BadRequestError{
    constructor(){
        super("Ci sono prenotazioni approvate dopo fine inseria. Update bloccato")
    }
}

export class CalendarNotExistError extends NotFoundError{
    constructor(){
        super("Calendario non trovato")
    }
}



export class RejectReservaionError extends BadRequestError{
    constructor(reason?: string){
        super()
        if(reason !== undefined) {
            this.message = this.message.concat(":",reason);
        }
    }
}

export class InvaidTokenError extends UnauthorizedError  {
    constructor(message?: string) {
        super(message || "Token non valido o scaduto");
    }   
}

export class ResourceNotYoursError extends UnauthorizedError  {
    constructor(message?: string) {
        super(message || "Non puoi fare azioni su risorse che non ti appartengono!");
    }   
}


export class UserNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super(message || "Utente non trovato");
    }
}

export class EmailUsedError extends ConflictError {
    constructor(message?: string) {
        super(message || "Email già in uso");
    }
}

export class AlredyApprovedReservationError extends ConflictError {
    constructor(message?: string) {
        super(message || "Prenotazione già approvata");
    }
}
export class AlredyRejectedReservationError extends ConflictError {
    constructor(message?: string) {
        super(message || "Prenotazione già rifiutata");
    }
}
export class ReservationCancelledError extends ConflictError {
    constructor(message?: string) {
        super(message || "Prenotazione cancellata");
    }
}
export class ReservationInvalidError extends ConflictError {
    constructor(message?: string) {
        super(message || "Prenotazione invalida");
    }
}

export class ReservationActiveInCalendarError extends ConflictError {
    constructor(message?: string) {
        super(message || "Prenotazione attiva nel calendario. Cancellazione annullata");
    }
}

export class TooLessTokenError extends UnauthorizedError{
    constructor(){
        super( "Non hai abbastanza token")
    }
}

export class SlotNotInCalError extends NotFoundError{
    constructor(){
        super("Gli slot inseriti non appartengono al calendario")
    }
}

export class ResourceNotFoundError extends NotFoundError{
    constructor(){
        super("Risorsa non trovata")
    }
}

export class SlotUsedError extends ConflictError{
    constructor(){
        super("1 o più slot richiesti non sono disponibili")
    }
}

export class ResourceUsedError extends ConflictError{
    constructor(){
        super("La risorsa è in uso in un altro calendario nel periodo inserito")
    }
}

export class LoginFailError extends ForbiddenError{
    constructor(){
        super("Login failed: emai o psw errati")
    }
}

export class ReservationNotFoundError extends NotFoundError{
    constructor(){
        super("Prenotazone non trovata")
    }
}