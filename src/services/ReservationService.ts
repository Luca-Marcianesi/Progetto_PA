import { Reservation } from "../models/Reservation";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { ReservationDataInterface } from "../dto/reservationModel";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { Calendar } from "../models/Calendar";
import { enumReservationStatus } from "../utils/db_const";

export class ReservationService {
    private userRepository : IUserRepository;
    private reservationRepository: IReservationRepository;
    private calendarRepository: ICalendarRepository;
    
    constructor(reservationRepository: IReservationRepository, calendarRepository: ICalendarRepository, userRepository: IUserRepository) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.calendarRepository = calendarRepository;
    }

    async newReservation(reservationData : ReservationDataInterface):Promise<Reservation | never>{
        try {

            let {calendar_id,start_time,end_time,user_id} = reservationData

            let cost_per_hour : number | null = 
                await this.calendarRepository.getCostPerHourCalendar(calendar_id)
            if( (cost_per_hour) === null) throw ErrorFactory.getError(ErrorType.UserNotFound)

            
            let isSlotExist =  await this.checkSlotExist(calendar_id, start_time, end_time)         
            if(!isSlotExist) throw  ErrorFactory.getError(ErrorType.SlotNotInCal)


            let conflicts: number = await this.searchConflicts(calendar_id,start_time, end_time)
            if(conflicts != 0) throw  ErrorFactory.getError(ErrorType.SlotUsed)
            
            
            const haveTokens : boolean = await this.checkHaveEnoughTokens(user_id,start_time,end_time,cost_per_hour)

            const reservation_status : enumReservationStatus = haveTokens ? enumReservationStatus.Pending : enumReservationStatus.Invalid

            //Devo salvare la prenotazione anche se non ha abbastanza token

            let reservation : Reservation = await this.reservationRepository.insertResevation(reservationData,reservation_status)

            if(reservation_status == enumReservationStatus.Invalid){
                throw ErrorFactory.getError(ErrorType.TooLessToken)
            }
            
            return reservation
            
            
        } catch (error) {
            throw error          
        
        }
    }

    async approveReservation(id: number, approvedBy: number){
        const reservation = await this.reservationRepository.findReservationById(id)
        if(!reservation) throw Error("not found")

        reservation.approve(approvedBy)
        this.reservationRepository.saveReservation(reservation)
        return reservation
    }

    async rejectReservation(id: number, rejectedBy: number, reason: string){
        const reservation = await this.reservationRepository.findReservationById(id)
        if(!reservation) throw Error("not found")

        reservation.reject(rejectedBy,reason)
        this.reservationRepository.saveReservation(reservation)
        return reservation

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

    private async searchConflicts(calendar_id: number, start_time: Date, end_time: Date): Promise<number>{
        return (await this.reservationRepository
                .findConflictsSlots(calendar_id,start_time, end_time)).length
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
        