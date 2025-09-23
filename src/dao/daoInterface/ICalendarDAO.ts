import { Calendar } from "../../models/Calendar";

export interface ICalendarDAO {
    getCalendarById(calendar_id: number):Promise<Calendar | null>

    findConflicting(resourceId: number, start: Date, end: Date): Promise<Calendar[]>

    create(resourceId: number,start_time: Date, end_time: Date,cost_per_hour: number,title: string):Promise<Calendar>

    updateArchiveCalendarStatus(id: number, status: boolean): Promise<void>

    deleteCalendar(id: number): Promise<void>

}