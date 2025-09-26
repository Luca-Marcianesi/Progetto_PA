import { Calendar } from "../../models/calendarModel";

export interface ICalendarDAO {
    getCalendarById(calendarId: number):Promise<Calendar | null>

    findConflicting(resourceId: number, start: Date, end: Date): Promise<Calendar[]>

    create(resourceId: number,start: Date, end: Date,costPerHour: number,title: string):Promise<Calendar>

    updateArchiveCalendarStatus(id: number): Promise<void>

    deleteCalendar(id: number): Promise<void>

    updateEnd(id: number,new_end: Date): Promise<void>

}