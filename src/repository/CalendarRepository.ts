import { Resource } from "../models/Resource";
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { ICalendarRepository } from "./repositoryInterface/ICalendarRepository";
import { Calendar } from "../models/Calendar";
import { ICalendarDAO } from "../dao/daoInterface/ICalendarDAO";

export class CalendarRepository implements ICalendarRepository {
    private resourceDAO: IResourceDAO;
    private calendarDAO: ICalendarDAO;

    constructor(resourceDAO: IResourceDAO , calendarDAO: ICalendarDAO) {
        this.resourceDAO = resourceDAO;
        this.calendarDAO = calendarDAO;
    }
    async createCalendar(calendarData: { resourceId: number; startTime: Date; endTime: Date; costPerHour: number; archived?: boolean; }): Promise<number> {
        // Implementa la logica per creare un calendario
        throw new Error("Method not implemented.");
    }
    async getCalendarById(id: number): Promise<Calendar | null> {
        // Implementa la logica per ottenere un calendario per ID
        throw new Error("Method not implemented.");
    }
    async updateCalendar(id: number, updateData: { resourceId?: number; startTime?: Date; endTime?: Date; costPerHour?: number; }): Promise<void> {
        // Implementa la logica per aggiornare un calendario
        throw new Error("Method not implemented.");
    }
    async deleteCalendar(id: number): Promise<void> {
        // Implementa la logica per eliminare un calendario
        throw new Error("Method not implemented.");
    }
    async archiveCalendar(id: number): Promise<void> {
        // Implementa la logica per archiviare un calendario
        throw new Error("Method not implemented.");
    }
    async unarchiveCalendar(id: number): Promise<void> {
        // Implementa la logica per ripristinare un calendario archiviato
        throw new Error("Method not implemented.");
    }
    async checkAvailability(id: number, startTime: Date, endTime: Date): Promise<boolean | never> {
        // Implementa la logica per verificare la disponibilità di un calendario
        throw new Error("Method not implemented.");
    }

    async getCalendarStart(calendar_id: number): Promise<Date> {
        throw new Error("Method not implemented.");
        
    }

    async getCalendarEnd(calendar_id: number): Promise<Date> {
        throw new Error("Method not implemented.");
        
    }

    async getCostPerHourCalendar(calendar_id: number): Promise<number | null> {
        throw new Error("Method not implemented.");
        
    } 
}