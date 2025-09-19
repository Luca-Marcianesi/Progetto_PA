import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { Reservation } from "../models/Reservation";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";

/*
export interface RequestState {
    book(): Promise<Reservation | never>;
    approve(): Promise<void | never>;
    cancel(): Promise<void | never>;
    reject(reason: string): Promise<void>
}

export abstract class BaseState implements RequestState{
    constructor (protected repository : IReservationRepository ,protected reservation : Reservation){
        this.repository = repository;
        this.reservation = reservation;
    }

    protected started(): boolean{
        return this.reservation.start_time.getTime() > Date.now();
    }

    abstract book(): Promise<Reservation | never>;
    abstract approve(): Promise<void | never>;
    abstract cancel(): Promise<void | never>;
    abstract reject(reason: string): Promise<void>


}

export class PendingState extends BaseState{
    constructor (protected repository : IReservationRepository ,protected reservation : Reservation){
        super(repository,reservation)
    }
    async book(): Promise<Reservation | never> {
        try {
            await this.repository.checkCalendarSlotUse(
                this.reservation.calendar_id,
                this.reservation.start_time,
                this.reservation.end_time
            )
            return await this.repository.book()
            
        } catch (error) {
            throw error
            
        }

        
    }

    async cancel(): Promise<void | never> {
        try {
            await this.repository.calcel()
            await this.repository.refoundToken(10)
            
        } catch (error) {
            throw error
            
        }
        
    }

    async approve(): Promise<void | never> {
        
    }

    async reject(reason: string): Promise<void>{
        await this.repository.reject(reason)

    }

}

export class InvalidState extends BaseState{
    constructor (protected repository : IReservationRepository ,protected reservation : Reservation){
        super(repository,reservation)
    }
    async book(): Promise<Reservation | never> {
        throw  ErrorFactory.getError(ErrorType.InvalidReservaion)
    }

    async cancel(): Promise<void | never> {

        
    }

    async approve(): Promise<void | never> {
        throw  ErrorFactory.getError(ErrorType.InvalidReservaion)
            
    }

    async reject(): Promise<void>{
        throw  ErrorFactory.getError(ErrorType.InvalidReservaion)
    }

}

export class ApprovedState extends BaseState{
    constructor (protected repository : IReservationRepository ,protected reservation : Reservation){
        super(repository,reservation)
    }
    async book(): Promise<Reservation | never> {
        throw new Error("non")
        
    }

    async cancel(): Promise<void | never> {
        
    }

    async approve(): Promise<void | never> {
        
    }

    async reject(): Promise<void>{
        
    }

}

export class RejectedState extends BaseState{
    constructor (protected repository : IReservationRepository ,protected reservation : Reservation){
        super(repository,reservation)
    }
    async book(): Promise<Reservation | never> {
        
    }

    async cancel(): Promise<void | never> {
        
    }

    async approve(): Promise<void | never> {
        
    }

    async reject(): Promise<void>{
        
    }

}

*/