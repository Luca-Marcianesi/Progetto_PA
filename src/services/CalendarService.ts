import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { Resource } from "../models/Resource";
import { Calendar } from "../models/Calendar";

export class CalendarService implements ICalendarService {
    private calendarRepository: ICalendarRepository;

    constructor(calendarRepository: ICalendarRepository) {
        this.calendarRepository = calendarRepository;
    }
    async createCalendar(calendarData: { resourceId: number; startTime: Date; endTime: Date; costPerHour: number; archived?: boolean; }): Promise<number> {
        return await this.calendarRepository.createCalendar(calendarData);
    }
    async getCalendarById(id: number): Promise<Calendar | null> {
        return await this.calendarRepository.getCalendarById(id);
    }
    async updateCalendar(id: number, updateData: { resourceId?: number; startTime?: Date; endTime?: Date; costPerHour?: number; }): Promise<void> {
        await this.calendarRepository.updateCalendar(id, updateData);
    }
    async deleteCalendar(id: number): Promise<void> {
        await this.calendarRepository.deleteCalendar(id);
    }
    async archiveCalendar(id: number): Promise<void> {
        await this.calendarRepository.archiveCalendar(id);
    }
    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendarRepository.unarchiveCalendar(id);
    }
 
}