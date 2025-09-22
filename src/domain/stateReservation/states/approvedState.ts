import { ErrorFactory, ErrorType } from "../../../middleware/errors/ErrorFactory";
import { enumReservationStatus } from "../../../utils/db_const";
import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";
import { CancelState } from "./cancelState";

export class ApprovedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        throw ErrorFactory.getError(ErrorType.AlredyApprovedReservation)
    }
    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        throw ErrorFactory.getError(ErrorType.AlredyApprovedReservation)
    
    }
    cancel(reservation: DomainReservation): void {
        reservation.setState(new CancelState())
        
    }

    getStatus(): enumReservationStatus {
        return enumReservationStatus.Approved
    }
}