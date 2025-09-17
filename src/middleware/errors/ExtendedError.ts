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

export class InvaidTokenError extends UnauthorizedError  {
    constructor(message?: string) {
        super(message || "Token non valido o scaduto");
    }   
}

export class InternalServerError extends BaseError  {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR , message || "Errore interno del server");
    }   
}

export class UserNotFounderror extends NotFoundError {
    constructor(message?: string) {
        super(message || "Utente non trovato");
    }
}

export class UnknownError extends BaseError {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR , message || "Errore sconosciuto");
    }   
}

export class EmailUsedError extends BaseError {
    constructor(message?: string) {
        super(StatusCodes.CONFLICT, message || "Email già in uso");
    }
}