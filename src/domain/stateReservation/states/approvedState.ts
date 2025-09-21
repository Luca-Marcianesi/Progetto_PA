import { enumReservationStatus } from "../../../utils/db_const";
import { DomainReservation } from "../../reservation";
import { IReservationState } from "../IReservationState";

export class ApprovedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        
    }
    reject(reservation: DomainReservation, rejectedBy: number, reason: string): void {
        
    }
    cancel(reservation: DomainReservation): void {
        
    }

    getStatus(): enumReservationStatus {
        return enumReservationStatus.Approved
    }
}