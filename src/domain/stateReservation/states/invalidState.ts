import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { EnumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/errorFactory";

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

    getStatus(): EnumReservationStatus {
            return EnumReservationStatus.Invalid
        }
}