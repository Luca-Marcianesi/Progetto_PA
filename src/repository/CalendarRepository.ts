import { Resource } from "../models/Resource";
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { ICalendarRepository } from "./repositoryInterface/ICalendarRepository";
import { Calendar } from "../models/Calendar";
import { ICalendarDAO } from "../dao/daoInterface/ICalendarDAO";
import { DomainCalendar } from "../domain/calendar";
import { IReservationDAO } from "../dao/daoInterface/IReservationDAO";
import { DomainReservation } from "../domain/reservation";

export class CalendarRepository implements ICalendarRepository {
    private reservationDAO: IReservationDAO;
    private calendarDAO: ICalendarDAO;

    constructor(reservationDAO: IReservationDAO , calendarDAO: ICalendarDAO) {
        this.reservationDAO = reservationDAO;
        this.calendarDAO = calendarDAO;
    }
    async createCalendar(calendarData:DomainCalendar): Promise<DomainCalendar> {
        await this.calendarDAO.create(
            calendarData.resource_id,
            calendarData.start_time,
            calendarData.end_time,
            calendarData.cost,
            calendarData.title
        )
        return calendarData
    }
    async getCalendarById(id: number): Promise<DomainCalendar | null> {

        let calendar_model = await this.calendarDAO.getCalendarById(id)

        let reservations_model = await this.reservationDAO.getReservatisByCalendarId(id)

        let reservations = reservations_model.map(r => DomainReservation.fromPersistence(r))

        if (calendar_model === null) return null

        let calendar = DomainCalendar.fromPersistence(calendar_model)

        calendar.addReservations(reservations)

        return calendar
    }
    async updateCostCalendar(id: number, cost: number): Promise<void> {
        // Implementa la logica per aggiornare un calendario
        throw new Error("Method not implemented.");
    }

    async updateEndCalendar(id: number, end: Date): Promise<void> {
        // Implementa la logica per aggiornare un calendario
        throw new Error("Method not implemented.");
    }


    async deleteCalendar(id: number): Promise<void> {
        await this.calendarDAO.deleteCalendar(id)
    }

    async archiveCalendar(id: number): Promise<void> {
        await this.calendarDAO.updateArchiveCalendarStatus(id,true)
    }

    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendarDAO.updateArchiveCalendarStatus(id,false)
        
    }

    async getCostPerHourCalendar(calendar_id: number): Promise<number | null> {
        return this.calendarDAO.getCalendarById(calendar_id).then(r => {
            return r === null ? null : r.cost_per_hour;
        });
        
    }

    getCalendarsByResourceId(id: number): Promise<DomainCalendar[]> {
        throw new Error("Method not implemented.");
    }

    async findConflicting(resourceId: number, start: Date, end: Date): Promise<DomainCalendar[]>{
        const records = await this.calendarDAO.findConflicting(resourceId, start, end);
        return records.map(r =>  DomainCalendar.fromPersistence(r));
    }
}