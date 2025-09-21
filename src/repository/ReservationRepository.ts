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
        
        return new DomainReservation(
            modelReservation.calendar_id,
            modelReservation.start_time,
            modelReservation.end_time,
            modelReservation.title,
            modelReservation.user_id,
            999,
            modelReservation.id,
            "da fare",
            reservation.getState(),


        )
    }

    async findReservationByCalendarId(calendar_id: number): Promise<DomainReservation[]> {
        let models = await this.reservationDAO.getReservatisByCalendarId(calendar_id)
        return models.map(r => new DomainReservation(
                r.calendar_id,
                r.start_time,
                r.end_time,
                r.title,
                r.user_id,

            ));
        
    }

    async findReservationById(reservation_id: number): Promise<DomainReservation | null> {
        const model = await this.reservationDAO.findByPk(reservation_id);
        if (!model) return null;

       

        return new DomainReservation(
            model.calendar_id,
            model.start_time,
            model.end_time,
            model.title,
            model.user_id,
            model.user_id,
            model.id,
            model.reason,
            this.getStateByStatus(model.status)
        );
        

        
    }

    async saveReservation(reservation: DomainReservation): Promise<void> {
       await this.reservationDAO.insert(reservation,reservation.getStatus())
        
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