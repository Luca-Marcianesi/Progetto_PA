import { Resource } from "../models/Resource";
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { ICalendarRepository } from "./repositoryInterface/ICalendarRepository";
import { Calendar } from "../models/Calendar";
import { ICalendarDAO } from "../dao/daoInterface/ICalendarDAO";
import { DomainCalendar } from "../domain/calendar";

export class CalendarRepository implements ICalendarRepository {
    private resourceDAO: IResourceDAO;
    private calendarDAO: ICalendarDAO;

    constructor(resourceDAO: IResourceDAO , calendarDAO: ICalendarDAO) {
        this.resourceDAO = resourceDAO;
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
        let model = await this.calendarDAO.getCalendarById(id)
        return model === null ? null : new DomainCalendar(
            model.resource_id,
            model.start_time,
            model.end_time,
            model.cost_per_hour,
            model.title,
            model.archived,
            model.id
        ) 
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
        return records.map(r => new DomainCalendar(r.resource_id, r.start_time, r.end_time,r.cost_per_hour, r.title,r.archived, r.id));
    }
}