import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { EnumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/errFactory";
import { CancelState } from "./cancelState";

export class RejectedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        throw ErrorFactory.getError(ErrorType.AlredyRejectedReservation)
        
    }
    reject(reservation: DomainReservation,rejectedBy: number, reason: string): void {
        throw ErrorFactory.getError(ErrorType.AlredyRejectedReservation)
        
    }
    cancel(reservation: DomainReservation): void {
        reservation.setState(new CancelState())
        
    }

    getStatus(): EnumReservationStatus {
            return EnumReservationStatus.Reject
        }
}