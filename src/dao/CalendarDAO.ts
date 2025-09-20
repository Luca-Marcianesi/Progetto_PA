import { Calendar } from "../models/Calendar";
import { ICalendarDAO } from "./daoInterface/ICalendarDAO";

export class CalendarDAO implements ICalendarDAO{

    async getCalendarById(calendar_id: number): Promise<Calendar | null> {
        return await Calendar.findByPk(calendar_id) 
    }
}