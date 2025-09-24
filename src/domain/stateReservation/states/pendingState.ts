import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { enumReservationStatus } from "../../../utils/db_const";
import { ErrorFactory, ErrorType } from "../../../middleware/errors/errorFactory";
import { CancelState } from "./cancelState";
import { ApprovedState } from "./approvedState";
import { RejectedState } from "./rejectedState";

export class PendingState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        reservation.setApprovedBy(approvedBy),
        reservation.setState(new ApprovedState())
        
        
    }

    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        reservation.setRejectedBy(rejectedBy,reason)
        reservation.setState( new RejectedState())
        
    }

    cancel(reservation: DomainReservation): void {
        reservation.setState(new CancelState())
        
    }

    getStatus(): enumReservationStatus {
            return enumReservationStatus.Pending
        }

}