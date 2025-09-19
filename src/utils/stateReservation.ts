import { DomainReservation } from "../domain/reservation";
import { Reservation } from "../models/Reservation";

export interface IReservationState {
    approve(reservation : DomainReservation,approvedBy: number):void;
    reject(reservation: DomainReservation, rejectedBY: number,reason: string): void;
    calcel(reservation: DomainReservation): void
}

export class PendingState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        
    }

    reject(reservation: DomainReservation, rejectedBY: number, reason: string): void {
        
    }

    calcel(reservation: DomainReservation): void {
        
    }

}

export class ApprovedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        
    }
    reject(reservation: DomainReservation, rejectedBY: number, reason: string): void {
        
    }
    calcel(reservation: DomainReservation): void {
        
    }
}

export class RejectedState implements IReservationState{
    approve(reservation: DomainReservation, approvedBy: number): void {
        
    }
    reject(reservation: DomainReservation,rejectedBY: number, reason: string): void {
        
    }
    calcel(reservation: DomainReservation): void {
        
    }
}