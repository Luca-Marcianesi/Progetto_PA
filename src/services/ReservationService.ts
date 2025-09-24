import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory";
import { enumReservationStatus } from "../utils/db_const";
import { DomainReservation } from "../domain/reservation";
import { NewReservationInput, ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../middleware/zodValidator/reservation.schema";
import { IReservationService } from "./serviceInterface/IReservationService";
import { buildRefundPolicyChain} from "../utils/reservationCoR/refaundTokenHandlers";

export class ReservationService implements IReservationService {
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

            let reservation = new DomainReservation({
                id: 1,
                calendar_id: reservationData.calendar_id,
                start: reservationData.start_time,
                end: reservationData.end_time,
                title: reservationData.title,
                reservationBy: user_id,
                status: enumReservationStatus.Pending
            }
            )

            let cost_per_hour = await this.getCalendarCost(reservation.calendar_id)

            if(!await this.checkSlotExist(calendar_id, start_time, end_time) ) throw  ErrorFactory.getError(ErrorType.SlotNotInCal)


            if(await this.searchConflicts(reservation) ) throw  ErrorFactory.getError(ErrorType.SlotUsed)
            
            let haveEnoughToken = await this.checkHaveEnoughTokens(user_id,start_time,end_time,cost_per_hour)
            const reservation_status = haveEnoughToken ? enumReservationStatus.Pending : enumReservationStatus.Invalid

            await this.userRepository.addTokenToUser(user_id,(-
                cost_per_hour* reservation.getHours()))
             reservation.setState(DomainReservation.mapStatus(reservation_status))

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

    async updatteReservation(id: number, newStatus: string,handledBy: number, reason?: string): Promise<void> {

        let reservation = await this.reservationRepository.findReservationById(id)

        if(reservation === null ) throw ErrorFactory.getError(ErrorType.ReservationNotFound)

        if(newStatus == enumReservationStatus.Reject){
            if (reason == undefined) throw new Error("Devi fornire una motivazione")

        let cost_per_hour = await this.calendarRepository.getCostPerHourCalendar(reservation.calendar_id)

        if (cost_per_hour === null) throw ErrorFactory.getError(ErrorType.CalNotExist)


        await this.userRepository.addTokenToUser(reservation.reservationBy,(cost_per_hour*reservation.getHours()))
        reservation.reject(handledBy,reason)
        }else{
            reservation.approve(handledBy)
        }

        await this.reservationRepository.saveReservation(reservation)


        
    }

    async getReservationsByCal(id: number): Promise<DomainReservation[]> {
        return await this.reservationRepository.findReservationsByCalendar(id)
    }

    async getReservationOptionalFilter(filter : ReservationOptionalFilterInput): Promise<DomainReservation[]> {
        return await this.reservationRepository.findReservationOptionalFilter(filter)
        
    }

    async getReservationsFilterStatus(filter : ReservationStatusFilterInput): Promise<DomainReservation[]> {
        return await this.reservationRepository.findReservationStatusFiltered(filter)
         
    }

    async deleteReservation(reservation_id: number, requestSender: number): Promise<void> {

        let reservation = await this.reservationRepository.findReservationById(reservation_id)

        if(reservation === null) throw ErrorFactory.getError(ErrorType.ReservationNotFound)

        if(reservation.reservationBy !== requestSender) throw ErrorFactory.getError(ErrorType.ResourceNotYours)

        let calendar_cost = await this.getCalendarCost(reservation.calendar_id)

        let refaudTokens = buildRefundPolicyChain().calculate(reservation,calendar_cost)

        await this.userRepository.addTokenToUser(reservation.reservationBy,refaudTokens)

        reservation.cancel()

        await this.reservationRepository.saveReservation(reservation)        
        
    }

    async approveReservation(id: number, approvedBy: number): Promise<void>{
        const reservation = await this.reservationRepository.findReservationById(id)
        
        if(reservation === null) throw ErrorFactory.getError(ErrorType.ReservationNotFound)

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
        let calendar = await this.calendarRepository.getCalendarById(calendar_id)

        if(calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist)

        if(start_time.getTime() < calendar.start_time.getTime()) return false

        if(end_time.getTime() > calendar.end_time.getTime()) return false

        return true
    }

    private async getCalendarCost(calendar_id: number): Promise<number>{
        let cost_per_hour : number | null = 
                await this.calendarRepository.getCostPerHourCalendar(calendar_id)
        if( (cost_per_hour) === null) throw ErrorFactory.getError(ErrorType.CalNotExist)
        return cost_per_hour
    }
    

    private async searchConflicts(reservation: DomainReservation): Promise<boolean>{

        const reservations = await this.reservationRepository.findReservationApprovedByCalendarId(reservation.calendar_id);

        return reservations.some(r => r.overlaps(reservation));
        
    }
    
    private getTotalCost(start_time: Date, end_time: Date, cost_per_hour: number): number {
        let hours = (end_time.getTime()- start_time.getTime())/( 3600 * 1000)
        return hours * cost_per_hour
        
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
        