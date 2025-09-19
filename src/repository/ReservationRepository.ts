import { ReservationDataInterface } from "../dto/reservationModel";
import { Reservation } from "../models/Reservation";
import { IReservationRepository } from "./repositoryInterface/IResevationRepository";
import {IReservationDAO} from "../dao/daoInterface/IReservationDAO"
import {ICalendarDao} from "../dao/daoInterface/ICalendarDAO"
import { Calendar } from "../models/Calendar";
import { DomainReservation } from "../domain/reservation";
import { enumReservationStatus } from "../utils/db_const";

export class reservationRepository implements IReservationRepository{
    private reservationDAO : IReservationDAO;
    private calendarDAO: ICalendarDao;

    constructor(reservationDAO : IReservationDAO , calendarDAO: ICalendarDao){
        this.reservationDAO = reservationDAO;
        this.calendarDAO = calendarDAO;

    }


    async insertResevation(reservation: ReservationDataInterface, status: enumReservationStatus): Promise<Reservation | never> {
        return await this.reservationDAO.insert(reservation,status)
    }

    async findConflictsSlots(calendar_id: number, start_time: Date, end_time: Date): Promise<Reservation[]> {
        let models = await this.reservationDAO.getReservatisByCalendarId(calendar_id)
        return models.filter(r =>
            r.status == enumReservationStatus.Approved &&
            r.start_time < end_time &&
            r.end_time > start_time
        )
        
    }

    async findReservationById(reservation_id: number): Promise<DomainReservation | null> {
        const model = await this.reservationDAO.findByPk(reservation_id);
        if (!model) return null;

        return new DomainReservation({
            id: model.id,
            status: model.status as enumReservationStatus
        }    
        )
        

        
    }

    async saveReservation(reservation: DomainReservation): Promise<void> {
        /*
        await ReservationModel.update(
      {
        status: entity.status,
        approvedBy: entity.approvedBy,
        rejectedBy: entity.rejectedBy,
        reason: entity.reason
      },
      { where: { id: entity.id } }
    );*/
        
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

}