import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { enumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/errorFactory";

export class CancelState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        throw ErrorFactory.getError(ErrorType.ReservationCancelled)
        
    }
    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        throw ErrorFactory.getError(ErrorType.ReservationCancelled)
        
    }
    cancel(reservation: DomainReservation): void {
        throw ErrorFactory.getError(ErrorType.ReservationCancelled)
        
    }

    getStatus(): enumReservationStatus {
            return enumReservationStatus.Calcel
        }
}