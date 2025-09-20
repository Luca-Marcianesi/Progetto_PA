import { Calendar } from "../../models/Calendar";
import { Resource } from "../../models/Resource";
export interface ICalendarService {
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

    unarchiveCalendar(id: number): Promise<void>;

}