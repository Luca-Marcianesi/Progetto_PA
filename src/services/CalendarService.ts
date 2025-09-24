import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { Resource } from "../models/Resource";
import { Calendar } from "../models/Calendar";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { CreateCalendarInput } from "../middleware/zodValidator/calendar.schema";
import { DomainCalendar } from "../domain/calendar";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { DomainReservation } from "../domain/reservation";
import { enumReservationStatus } from "../utils/db_const";

export class CalendarService implements ICalendarService {
    private calendar_repository: ICalendarRepository;
    private resource_repository: IResourceRepository;
    private reservation_repository: IReservationRepository
    private user_repository: IUserRepository

    constructor(calendar_repository: ICalendarRepository, resource_repository: IResourceRepository,reservation_repository: IReservationRepository, user_repository: IUserRepository) {
        this.calendar_repository = calendar_repository;
        this.resource_repository = resource_repository;
        this.reservation_repository = reservation_repository
        this.user_repository = user_repository
    }
    async createCalendar(calendarData: CreateCalendarInput): Promise<DomainCalendar> {
        
        if(!await this.doesResourceExist(calendarData.resource_id)) 
            throw ErrorFactory.getError(ErrorType.ResourceNotFound)

        if(await this.isResourceBusy(calendarData.resource_id,calendarData.start,calendarData.end)) 
            throw ErrorFactory.getError(ErrorType.ResourceUsed)

        let calendar = new DomainCalendar({
            id: 1,
            resource_id: calendarData.resource_id,
            start_time: calendarData.start,
            end_time: calendarData.end,
            cost:calendarData.cost_per_hour,
            title: calendarData.title
        })
        return await this.calendar_repository.createCalendar(calendar);


    }
    async getCalendarById(id: number): Promise<DomainCalendar | null> {
        let calendar = await this.calendar_repository.getCalendarById(id)

        if (calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist) 
        
        return calendar
        
    }
    async updateCostCalendar(id: number, new_cost : number): Promise<void> {
        throw Error("Not implemented")
    }

    async updateEndCalendar(id: number, new_end : Date): Promise<void>{

    }

    async deleteCalendar(id: number): Promise<void> {

        let calendar = await this.calendar_repository.getCalendarById(id)

        if(calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist)

        let calendar_cost = calendar.cost

        let reservations = await this.reservation_repository.findReservationsByCalendar(id)

        let isActive = reservations.some(r => r.isActive())

        if( isActive) throw ErrorFactory.getError(ErrorType.ReservationActiveInCalendar)

        for (const reservation of reservations.filter(res => res.isWaitingToStart())) {
            let refundToken = reservation.getHours() * calendar_cost
            await this.user_repository.addTokenToUser(reservation.id!, refundToken);
            }

        await this.calendar_repository.deleteCalendar(id);
    }

    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendar_repository.unarchiveCalendar(id);
    }

    async checkSlotAvaiability(calendar_id: number, start: Date, end: Date): Promise<boolean> {
        let reservation = await this.reservation_repository.findReservationsByCalendar(calendar_id)

        //Oggetto fittizio per fare il confronto con quelli salvati nel db
        let new_reservation = new DomainReservation({
            id: 1,
            reservationBy: 1,
            title: "",
            status:enumReservationStatus.Pending,
            calendar_id: calendar_id,
            start,
            end
            }
        )
        return reservation.some(r => r.overlaps(new_reservation))

        
    }

    private async doesResourceExist(id: number):Promise<boolean>{
        return await this.resource_repository.getResourceById(id) === null ?  false :  true
    }

    private async isResourceBusy(id : number, start: Date, end: Date): Promise<boolean>{

        const calendars = await this.calendar_repository.findConflicting(id,start,end)
        return (calendars.length == 0) ? false : true
    }
 
}