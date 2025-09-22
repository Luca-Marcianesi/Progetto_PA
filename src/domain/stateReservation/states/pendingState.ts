import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { enumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/ErrorFactory";

export class PendingState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        
        
    }

    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        
    }

    cancel(reservation: DomainReservation): void {
        
    }

    getStatus(): enumReservationStatus {
            return enumReservationStatus.Pending
        }

}