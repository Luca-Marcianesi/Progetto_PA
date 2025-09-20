import { Calendar } from "../../models/Calendar";

export interface ICalendarDAO {
    getCalendarById(calendar_id: number):Promise<Calendar | null>
}