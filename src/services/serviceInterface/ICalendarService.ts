import { DomainCalendar } from "../../domain/calendar";
import { CreateCalendarInput } from "../../middleware/zodValidator/calendar.schema";

export interface ICalendarService {
    createCalendar(calendarData: CreateCalendarInput): Promise<DomainCalendar>;

    getCalendarById(id: number): Promise<DomainCalendar | null>;

    updateEndCalendar(id: number, end : Date): Promise<void>
    

    deleteCalendar(id: number): Promise<void>;

    unarchiveCalendar(id: number): Promise<void>;

    checkSlotAvaiability(calendar_id: number, start: Date, end: Date):Promise<boolean>

}