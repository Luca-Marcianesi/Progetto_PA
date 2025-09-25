import { ICalendarService } from "./serviceInterface/ICalendarService";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { CreateCalendarInput } from "../middleware/zodValidator/calendar.schema";
import { DomainCalendar } from "../domain/calendar";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { DomainReservation } from "../domain/reservation";
import { EnumReservationStatus } from "../utils/db_const";
import { buildRefundPolicyChain } from "../utils/reservationCoR/refaundTokenHandlers";

export class CalendarService implements ICalendarService {
    private calendarRepository: ICalendarRepository;
    private resourceRepository: IResourceRepository;
    private reservationRepository: IReservationRepository
    private userRepository: IUserRepository

    constructor(calendarRepository: ICalendarRepository, resourceRepository: IResourceRepository,reservationRepository: IReservationRepository, userRepository: IUserRepository) {
        this.calendarRepository = calendarRepository;
        this.resourceRepository = resourceRepository;
        this.reservationRepository = reservationRepository
        this.userRepository = userRepository
    }
    async createCalendar(calendarData: CreateCalendarInput): Promise<DomainCalendar> {
        
        if(!await this.doesResourceExist(calendarData.resourceId)) 
            throw ErrorFactory.getError(ErrorType.ResourceNotFound)

        if(await this.isResourceBusy(calendarData.resourceId,calendarData.start,calendarData.end)) 
            throw ErrorFactory.getError(ErrorType.ResourceUsed)

        let calendar = new DomainCalendar({
            id: 1,
            resourceId: calendarData.resourceId,
            start: calendarData.start,
            end: calendarData.end,
            cost:calendarData.costPerHour,
            title: calendarData.title
        })
        return await this.calendarRepository.createCalendar(calendar);


    }
    async getCalendarById(id: number): Promise<DomainCalendar | null> {
        let calendar = await this.calendarRepository.getCalendarById(id)

        if (calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist) 
        
        return calendar
        
    }
    async updateCostCalendar(id: number, new_cost : number): Promise<void> {
        throw Error("Not implemented")
    }

    async updateEndCalendar(id: number, new_end : Date): Promise<void>{
        throw Error("Not implemented")
    }

    async deleteCalendar(id: number): Promise<void> {

        let calendar = await this.calendarRepository.getCalendarById(id)

        if(calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist)

        let reservations = await this.reservationRepository.findReservationsByCalendar(id)

        //Check if there is at least one reservation active in this momemt
        let isActive = reservations.some(r => r.isActive())

        if( isActive) throw ErrorFactory.getError(ErrorType.ReservationActiveInCalendar)

        // Chain Of Responsability for the managment of the refaund policy
        const refundChain = buildRefundPolicyChain()

        for (const reservation of reservations) {
            const refundTokens = refundChain.calculate(reservation, calendar.cost) ?? 0;
            if (refundTokens > 0) {
                await this.userRepository.addTokenToUser(reservation.reservationBy, refundTokens);
            }
        }
        await this.calendarRepository.deleteCalendar(id);
    }


    async unarchiveCalendar(id: number): Promise<void> {
        await this.calendarRepository.unarchiveCalendar(id);
    }
    

    async checkSlotAvaiability(calendar_id: number, start: Date, end: Date): Promise<boolean> {
        let reservation = await this.reservationRepository.findReservationsByCalendar(calendar_id)

        //Oggetto fittizio per fare il confronto con quelli salvati nel db
        let new_reservation = new DomainReservation({
            id: 1,
            reservationBy: 1,
            title: "",
            status:EnumReservationStatus.Pending,
            calendar_id: calendar_id,
            start,
            end
            }
        )
        return reservation.some(r => r.overlaps(new_reservation))

        
    }

    private async doesResourceExist(id: number):Promise<boolean>{
        return await this.resourceRepository.getResourceById(id) === null ?  false :  true
    }

    private async isResourceBusy(id : number, start: Date, end: Date): Promise<boolean>{

        const calendars = await this.calendarRepository.findConflicting(id,start,end)
        return (calendars.length == 0) ? false : true
    }
 
}