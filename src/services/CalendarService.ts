import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { Resource } from "../models/Resource";

export class CalendarService implements ICalendarService {
    private calendarRepository: ICalendarRepository;

    constructor(calendarRepository: ICalendarRepository) {
        this.calendarRepository = calendarRepository;
    }
    async createCalendar(calendarData: { resourceId: number; startTime: Date; endTime: Date; costPerHour: number; archived?: boolean; }): Promise<number> {
        return await this.calendarRepository.createCalendar(calendarData);
    }
    async getCalendarById(id: number): Promise<Resource | null> {
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
    async checkAvailability(id: number, startTime: Date, endTime: Date): Promise<boolean | never> {
        return await this.calendarRepository.checkAvailability(id, startTime, endTime);
    }

    async createResource(resourceData: { name: string; description?: string | null; }): Promise<number> {
        return await this.calendarRepository.createResource(resourceData);
    }
    async getResourceById(id: number): Promise<Resource | null> {
        return await this.calendarRepository.getResourceById(id);
    }
    async getAllResources(): Promise<Resource[]> {
        return await this.calendarRepository.getAllResources();
    }
    async updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void> {
        await this.calendarRepository.updateResource(id, updateData);
    }
}