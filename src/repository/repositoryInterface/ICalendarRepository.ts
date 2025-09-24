import { DomainCalendar } from "../../domain/calendar";


export interface ICalendarRepository {

    // Il CalendarRepository si occupa di operazioni CRUD e di gestione del calendario

    createCalendar(calendarData: DomainCalendar): Promise<DomainCalendar>;

    getCalendarById(id: number): Promise<DomainCalendar | null>;

    updateCostCalendar(id: number,  cost: number): Promise<void>;

    updateEndCalendar(id: number,  cost: Date): Promise<void>;

    deleteCalendar(id: number): Promise<void>;

    getCostPerHourCalendar(calendar_id: number): Promise<number | null>;

    unarchiveCalendar(id: number): Promise<void>; 

    findConflicting(resourceId: number, start: Date, end: Date): Promise<DomainCalendar[]>

}

