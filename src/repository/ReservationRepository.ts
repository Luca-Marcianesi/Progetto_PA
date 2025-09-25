import { IReservationRepository } from "./repositoryInterface/IResevationRepository";
import {IReservationDAO} from "../dao/daoInterface/IReservationDAO"
import {ICalendarDAO} from "../dao/daoInterface/ICalendarDAO"
import { DomainReservation } from "../domain/reservation";
import { EnumReservationStatus } from "../utils/db_const";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../middleware/zodValidator/reservation.schema";

export class ReservationRepository implements IReservationRepository{
    private reservationDAO : IReservationDAO;
    private calendarDAO: ICalendarDAO;

    constructor(reservationDAO : IReservationDAO , calendarDAO: ICalendarDAO){
        this.reservationDAO = reservationDAO;
        this.calendarDAO = calendarDAO;

    }


    async insertResevation(reservation: DomainReservation, status: EnumReservationStatus): Promise<DomainReservation | never> {
        let modelReservation = await this.reservationDAO.insert(reservation,status)
        if(!modelReservation) throw ErrorFactory.getError(ErrorType.InternalServer)
        
        return DomainReservation.fromPersistence(modelReservation)
            
    }

    async findReservationApprovedByCalendarId(calendarId: number): Promise<DomainReservation[]> {
        let models = await this.reservationDAO.getReservationApproved(calendarId)
        return models
        .map(r =>  DomainReservation.fromPersistence(r));
        
    }

    async findReservationsByCalendar(calendarId: number): Promise<DomainReservation[]> {
        const models = await this.reservationDAO.getReservatisByCalendarId(calendarId)
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
        let reservation = await this.reservationDAO.getReservationStatusFilter(filter)
        return reservation
        .map(model =>  DomainReservation.fromPersistence(model))
        
    }

    async saveReservation(reservation: DomainReservation): Promise<void> {
       await this.reservationDAO.saveUpdatedReservation(reservation)
        
    }


}