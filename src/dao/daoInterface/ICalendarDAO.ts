import { Calendar } from "../../models/Calendar";

export interface ICalendarDao {
    getCalendarById(calendar_id: number):Promise<Calendar | null>
}