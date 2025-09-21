import { Reservation } from "../models/Reservation";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { Calendar } from "../models/Calendar";
import { enumReservationStatus } from "../utils/db_const";
import { DomainReservation } from "../domain/reservation";
import { NewReservationInput } from "../middleware/zodValidator/reservation.schema";

export class ReservationService {
    private userRepository : IUserRepository;
    private reservationRepository: IReservationRepository;
    private calendarRepository: ICalendarRepository;
    
    constructor(reservationRepository: IReservationRepository, calendarRepository: ICalendarRepository, userRepository: IUserRepository) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.calendarRepository = calendarRepository;
    }

    async newReservation(reservationData : NewReservationInput, user_id: number ):Promise<DomainReservation | never>{
        try {

            let {calendar_id, start_time, end_time} = reservationData

            let reservation = new DomainReservation(
                reservationData.calendar_id,
                reservationData.start_time,
                reservationData.end_time,
                reservationData.title,
                user_id

            )

            let cost_per_hour : number | null = 
                await this.calendarRepository.getCostPerHourCalendar(reservation.calendar_id)
            if( (cost_per_hour) === null) throw ErrorFactory.getError(ErrorType.UserNotFound)

            if(!await this.checkSlotExist(calendar_id, start_time, end_time) ) throw  ErrorFactory.getError(ErrorType.SlotNotInCal)


            if(!await this.searchConflicts(reservation) ) throw  ErrorFactory.getError(ErrorType.SlotUsed)
            

            const reservation_status : enumReservationStatus = await this.checkHaveEnoughTokens(user_id,start_time,end_time,cost_per_hour)
             ? enumReservationStatus.Pending : enumReservationStatus.Invalid

            //Devo salvare la prenotazione anche se non ha abbastanza token

            let reservationOut : DomainReservation = await this.reservationRepository.insertResevation(reservation,reservation_status)

            if(reservation_status == enumReservationStatus.Invalid){
                throw ErrorFactory.getError(ErrorType.TooLessToken)
            }
            
            return reservationOut

        } catch (error) {
            throw error          
        
        }
    }

    async approveReservation(id: number, approvedBy: number): Promise<void>{
        const reservation = await this.reservationRepository.findReservationById(id)
        if(!reservation) throw ErrorFactory.getError(ErrorType.ReservationNotFound)

        reservation.approve(approvedBy)
        this.reservationRepository.saveReservation(reservation)
    }

    async rejectReservation(id: number, rejectedBy: number, reason: string): Promise<void>{
        const reservation = await this.reservationRepository.findReservationById(id)
        if(!reservation) throw ErrorFactory.getError(ErrorType.ReservationNotFound)

        reservation.reject(rejectedBy,reason)
        this.reservationRepository.saveReservation(reservation)

    }



    private async checkSlotExist(calendar_id: number, start_time: Date, end_time: Date):Promise<boolean>{
        if(start_time.getTime() < 
        (await this.calendarRepository.getCalendarStart(calendar_id)).getTime()) return false

        if(end_time.getTime() < 
        (await this.calendarRepository.getCalendarEnd(calendar_id)).getTime()) return false

        return true
    }

    private getTotalCost(start_time: Date, end_time: Date, cost_per_hour: number): number {
        return (end_time.getTime()- start_time.getTime()) * 3600 * 1000 * cost_per_hour
        
    }

    private async searchConflicts(reservation: DomainReservation): Promise<boolean>{

        const reservations = await this.reservationRepository.findReservationByCalendarId(reservation.calendar_id);

        return reservations.some(r => r.overlaps(reservation));
        


    }

    private async  checkHaveEnoughTokens(
        user_id: number,
        start_time: Date,
        end_time: Date,
        cost_per_hour: number): Promise<boolean>{
        const user_token = await this.userRepository.getUserToken(user_id)
        if(user_token == null) throw ErrorFactory.getError(ErrorType.UserNotFound)
        return (user_token < this.getTotalCost(start_time,end_time,cost_per_hour)) 
                ? false : true

    }
}
        