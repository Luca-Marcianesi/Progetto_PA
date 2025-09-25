import { ICalendarRepository } from "./repositoryInterface/ICalendarRepository";
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
            calendarData.resourceId,
            calendarData.start,
            calendarData.end,
            calendarData.cost,
            calendarData.title
        )
        return calendarData
    }
    async getCalendarById(id: number): Promise<DomainCalendar | null> {

        let calendarModel = await this.calendarDAO.getCalendarById(id)

        let reservationsModel = await this.reservationDAO.getReservatisByCalendarId(id)

        // Mapping of the Sequelize model into the Domain model
        let reservations = reservationsModel.map(r => DomainReservation.fromPersistence(r))

        if (calendarModel === null) return null

        // Mapping of the Sequelize model into the Domain model
        let calendar = DomainCalendar.fromPersistence(calendarModel)

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


    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendarDAO.updateArchiveCalendarStatus(id)
        
    }

    async getCostPerHourCalendar(calendarId: number): Promise<number | null> {
        return this.calendarDAO.getCalendarById(calendarId).then(r => {
            return r === null ? null : r.cost_per_hour;
        });
        
    }

    getCalendarsByResourceId(id: number): Promise<DomainCalendar[]> {
        throw new Error("Method not implemented.");
    }

    async findConflicting(resourceId: number, start: Date, end: Date): Promise<DomainCalendar[]>{

        // Get the reservations in the calendar in that period(Approved,Pending,ecc)
        const records = await this.calendarDAO.findConflicting(resourceId, start, end);

        // Mapping of the Sequelize model into the Domain model
        return records.map(r =>  DomainCalendar.fromPersistence(r));
    }
}