import { Reservation } from "../models/Reservation";
import { IReservationRepository } from "./repositoryInterface/IResevationRepository";
import {IReservationDAO} from "../dao/daoInterface/IReservationDAO"
import {ICalendarDAO} from "../dao/daoInterface/ICalendarDAO"
import { Calendar } from "../models/Calendar";
import { DomainReservation } from "../domain/reservation";
import { enumReservationStatus } from "../utils/db_const";
import { IReservationState } from "../domain/stateReservation/IReservationState";
import { ApprovedState } from "../domain/stateReservation/states/approvedState";
import { PendingState } from "../domain/stateReservation/states/pendingState";
import { RejectedState } from "../domain/stateReservation/states/rejectedState";
import { CancelState } from "../domain/stateReservation/states/cancelState";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../middleware/zodValidator/reservation.schema";

export class ReservationRepository implements IReservationRepository{
    private reservationDAO : IReservationDAO;
    private calendarDAO: ICalendarDAO;

    constructor(reservationDAO : IReservationDAO , calendarDAO: ICalendarDAO){
        this.reservationDAO = reservationDAO;
        this.calendarDAO = calendarDAO;

    }


    async insertResevation(reservation: DomainReservation, status: enumReservationStatus): Promise<DomainReservation | never> {
        let modelReservation = await this.reservationDAO.insert(reservation,status)
        if(!modelReservation) throw ErrorFactory.getError(ErrorType.InternalServer)
        
        return DomainReservation.fromPersistence(modelReservation)
            
    }

    async findReservationApprovedByCalendarId(calendar_id: number): Promise<DomainReservation[]> {
        let models = await this.reservationDAO.getReservationApproved(calendar_id)
        return models
        .map(r =>  DomainReservation.fromPersistence(r));
        
    }

    async findReservationsByCalendar(calendar_id: number): Promise<DomainReservation[]> {
        const models = await this.reservationDAO.getReservatisByCalendarId(calendar_id)
        return models
        .map(r =>  DomainReservation.fromPersistence(r))
    }

    async findReservationById(reservation_id: number): Promise<DomainReservation | null> {
        const model = await this.reservationDAO.findByPk(reservation_id);
        if (!model) return null;

        return  DomainReservation.fromPersistence(model)
            
        
    }

    async findReservationOptionalFilter(filter: ReservationOptionalFilterInput): Promise<DomainReservation[]> {
        let reservation = await this.reservationDAO.getReservationOptinalFilter(filter)
        return reservation
        .map(model =>  DomainReservation.fromPersistence(model))

        
    }

    async findReservationStatusFiltered(filter: ReservationStatusFilterInput): Promise<DomainReservation[]> {
        let reservation = await this.reservationDAO.getReservationOptinalFilter(filter)
        return reservation
        .map(model =>  DomainReservation.fromPersistence(model))
        
    }

    async saveReservation(reservation: DomainReservation): Promise<void> {
       await this.reservationDAO.saveUpdatedReservation(reservation)
        
    }

    async approve(): Promise<void | never> {
        throw Error("Not implemented")
    }

    async reject(reason: string): Promise<void> {
        throw Error("Not implemented")
    }

    async refoundToken(token: number): Promise<void> {
        throw Error("Not implemented")
    }

    async calcel(): Promise<void | never> {
        throw Error("Not implemented")
    }

    private getStateByStatus(status : enumReservationStatus): IReservationState{ 
        switch(status){
            case enumReservationStatus.Approved:
                return new ApprovedState ()    
            case enumReservationStatus.Pending:
                return new PendingState()
            case enumReservationStatus.Reject:
                return  new RejectedState()
            case enumReservationStatus.Calcel:
                return new CancelState()
            default:
                return new RejectedState()
        }

    }

}