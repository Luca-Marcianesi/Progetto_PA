import { DomainCalendar } from "../../domain/calendar";
import { CreateCalendarInput } from "../../middleware/zodValidator/calendar.schema";
import { Calendar } from "../../models/Calendar";
import { Resource } from "../../models/Resource";
export interface ICalendarService {
    createCalendar(calendarData: CreateCalendarInput): Promise<DomainCalendar>;

    getCalendarById(id: number): Promise<DomainCalendar | null>;

    updateCostCalendar(id: number, new_cost : number): Promise<void>
    
    updateEndCalendar(id: number, new_end : Date): Promise<void>

    deleteCalendar(id: number): Promise<void>;

    unarchiveCalendar(id: number): Promise<void>;

    checkSlotAvaiability(calendar_id: number, start: Date, end: Date):Promise<boolean>

}