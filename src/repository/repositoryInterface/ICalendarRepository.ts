import { Calendar } from "../../models/Calendar";
import { Resource } from "../../models/Resource";

export interface ICalendarRepository {

    // Il CalendarRepository si occupa di operazioni CRUD e di gestione del calendario ed
    // anche per CRUD delle risorse associate al calendario.

    createCalendar(calendarData: { 
        resourceId: number; 
        startTime: Date; 
        endTime: Date; 
        costPerHour: number; 
        archived?: boolean; }): Promise<number>;

    getCalendarById(id: number): Promise<Calendar | null>;

    updateCalendar(id: number, updateData: { 
        resourceId?: number; 
        startTime?: Date;
        endTime?: Date;
        costPerHour?: number; 
    }): Promise<void>;

    deleteCalendar(id: number): Promise<void>;

    archiveCalendar(id: number): Promise<void>;

    getCostPerHourCalendar(calendar_id: number): Promise<number | null>;

    getCalendarStart(calendar_id: number): Promise<Date>;

    getCalendarEnd(calendar_id: number): Promise<Date>;

    unarchiveCalendar(id: number): Promise<void>;

    checkAvailability(id: number, startTime: Date, endTime: Date): Promise<boolean | never>;

    createResource(resourceData: { name: string; description?: string | null; }): Promise<number>;

    getResourceById(id: number): Promise<Resource | null>;

    getAllResources(): Promise<Resource[]>;

    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void>;

    

}

