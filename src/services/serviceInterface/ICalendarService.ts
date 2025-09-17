import { Resource } from "../../models/Resource";
export interface ICalendarService {
    createCalendar(calendarData: { 
        resourceId: number; 
        startTime: Date; 
        endTime: Date; 
        costPerHour: number; 
        archived?: boolean; }): Promise<number>;

    getCalendarById(id: number): Promise<Resource | null>;

    updateCalendar(id: number, updateData: { 
        resourceId?: number; 
        startTime?: Date;
        endTime?: Date;
        costPerHour?: number; 
    }): Promise<void>;

    deleteCalendar(id: number): Promise<void>;

    archiveCalendar(id: number): Promise<void>;

    unarchiveCalendar(id: number): Promise<void>;

    checkAvailability(id: number, startTime: Date, endTime: Date): Promise<boolean | never>;

    createResource(resourceData: { name: string; description?: string | null; }): Promise<number>;

    getResourceById(id: number): Promise<Resource | null>;

    getAllResources(): Promise<Resource[]>;

    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void>;
}