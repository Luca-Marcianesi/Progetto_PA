import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { enumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/ErrorFactory";

export class RejectedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        throw ErrorFactory.getError(ErrorType.AlredyRejectedReservation)
        
    }
    reject(reservation: DomainReservation,rejectedBy: number, reason: string): void {
        throw ErrorFactory.getError(ErrorType.AlredyRejectedReservation)
        
    }
    cancel(reservation: DomainReservation): void {
        
    }

    getStatus(): enumReservationStatus {
            return enumReservationStatus.Reject
        }
}