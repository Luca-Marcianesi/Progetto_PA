import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { enumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/ErrorFactory";

export class InvalidState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        throw ErrorFactory.getError(ErrorType.InvalidReservaion)
        
    }
    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        throw ErrorFactory.getError(ErrorType.InvalidReservaion)
        
    }
    cancel(reservation: DomainReservation): void {
        throw ErrorFactory.getError(ErrorType.InvalidReservaion)
        
    }

    getStatus(): enumReservationStatus {
            return enumReservationStatus.Invalid
        }
}