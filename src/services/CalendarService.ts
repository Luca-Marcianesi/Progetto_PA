import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { Resource } from "../models/Resource";
import { Calendar } from "../models/Calendar";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { CreateCalendarInput } from "../middleware/zodValidator/calendar.schema";
import { DomainCalendar } from "../domain/calendar";

export class CalendarService implements ICalendarService {
    private calendar_repository: ICalendarRepository;
    private resource_repository: IResourceRepository;

    constructor(calendar_repository: ICalendarRepository, resource_repository: IResourceRepository) {
        this.calendar_repository = calendar_repository;
        this.resource_repository = resource_repository; 
    }
    async createCalendar(calendarData: CreateCalendarInput): Promise<DomainCalendar> {
        
        if(!await this.doesResourceExist(calendarData.resource_id)) throw Error("errore non implemenato reso not found")

        if(!await this.isResourceBusy(calendarData.resource_id,calendarData.start,calendarData.end)) throw Error("errore non implemenato reso occupata")

        let calendar = new DomainCalendar(
            calendarData.resource_id,
            calendarData.start,
            calendarData.end,
            calendarData.cost_per_hour,
            calendarData.title
        )
        return await this.calendar_repository.createCalendar(calendar);


    }
    async getCalendarById(id: number): Promise<Calendar | null> {
        return await this.calendar_repository.getCalendarById(id);
    }
    async updateCostCalendar(id: number, new_cost : Date): Promise<void> {
        throw Error("Not implemented")
    }

    async updateEndCalendar(id: number, new_end : Date): Promise<void>{

    }

    async deleteCalendar(id: number): Promise<void> {
        await this.calendar_repository.deleteCalendar(id);
    }
    async archiveCalendar(id: number): Promise<void> {
        await this.calendar_repository.archiveCalendar(id);
    }
    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendar_repository.unarchiveCalendar(id);
    }

    private async doesResourceExist(id: number):Promise<boolean>{
        return await this.resource_repository.getResourceById(id) === null ?  true :  false
    }

    private async isResourceBusy(id : number, start: Date, end: Date): Promise<boolean>{

        const calendars = await this.calendar_repository.findConflicting(id,start,end)
        return (calendars.length == 0) ? false : true
    }
 
}