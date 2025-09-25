import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { ICalendarRepository } from "../repository/repositoryInterface/ICalendarRepository";
import { IUserRepository } from "../repository/repositoryInterface/IUserRepository";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory";
import { EnumReservationStatus } from "../utils/db_const";
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

    async newReservation(reservationData : NewReservationInput, userId: number ):Promise<DomainReservation | never>{
        try {

            let {calendar_id, start_time, end_time} = reservationData

            let reservation = new DomainReservation({
                id: 1,
                calendar_id: reservationData.calendar_id,
                start: reservationData.start_time,
                end: reservationData.end_time,
                title: reservationData.title,
                reservationBy: userId,
                status: EnumReservationStatus.Pending
            }
            )

            let costPerHour = await this.getCalendarCost(reservation.calendarId)

            // Check if the slot requested exist
            if(!await this.checkSlotExist(calendar_id, start_time, end_time) ) throw  ErrorFactory.getError(ErrorType.SlotNotInCal)

            // Serch if there is at least one reservation in conflict with the new one
            if(await this.searchConflicts(reservation) ) throw  ErrorFactory.getError(ErrorType.SlotUsed)
            
            let haveEnoughToken = await this.checkHaveEnoughTokens(userId,start_time,end_time,costPerHour)
            const reservation_status = haveEnoughToken ? EnumReservationStatus.Pending : EnumReservationStatus.Invalid

            await this.userRepository.addTokenToUser(userId,(-
                costPerHour* reservation.getHours()))
             reservation.setState(DomainReservation.mapStatus(reservation_status))

            //Devo salvare la prenotazione anche se non ha abbastanza token

            let reservationOut : DomainReservation = await this.reservationRepository.insertResevation(reservation,reservation_status)

            if(reservation_status == EnumReservationStatus.Invalid){
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

        if(newStatus == EnumReservationStatus.Reject){
            if (reason == undefined) throw new Error("Devi fornire una motivazione")

        let costPerHour = await this.calendarRepository.getCostPerHourCalendar(reservation.calendarId)

        if (costPerHour === null) throw ErrorFactory.getError(ErrorType.CalNotExist)

        // if the reservetion is rejected the sistem refaud the token
        await this.userRepository.addTokenToUser(reservation.reservationBy,(costPerHour*reservation.getHours()))
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

        let calendar_cost = await this.getCalendarCost(reservation.calendarId)

        // Chain of Responsability to calculate the tokens to refaund
        let refaudTokens = buildRefundPolicyChain().calculate(reservation,calendar_cost)

        await this.userRepository.addTokenToUser(reservation.reservationBy,refaudTokens)

        reservation.cancel()

        await this.reservationRepository.saveReservation(reservation)        
        
    }



    private async checkSlotExist(calendar_id: number, start_time: Date, end_time: Date):Promise<boolean>{
        let calendar = await this.calendarRepository.getCalendarById(calendar_id)

        if(calendar === null) throw ErrorFactory.getError(ErrorType.CalNotExist)

        if(start_time.getTime() < calendar.start.getTime()) return false

        if(end_time.getTime() > calendar.end.getTime()) return false

        return true
    }

    private async getCalendarCost(calendar_id: number): Promise<number>{
        let costPerHour : number | null = 
                await this.calendarRepository.getCostPerHourCalendar(calendar_id)
        if( (costPerHour) === null) throw ErrorFactory.getError(ErrorType.CalNotExist)
        return costPerHour
    }
    

    private async searchConflicts(reservation: DomainReservation): Promise<boolean>{

        const reservations = await this.reservationRepository.findReservationApprovedByCalendarId(reservation.calendarId);

        // Return true if at least one of the reservation stored on the db overlaps the new one
        return reservations.some(r => r.overlaps(reservation));
        
    }
    
    private getTotalCost(start_time: Date, end_time: Date, costPerHour: number): number {
        let hours = (end_time.getTime()- start_time.getTime())/( 3600 * 1000)
        return hours * costPerHour
        
    }

    private async  checkHaveEnoughTokens(
        userId: number,
        start_time: Date,
        end_time: Date,
        costPerHour: number): Promise<boolean>{
        const user_token = await this.userRepository.getUserToken(userId)
        if(user_token == null) throw ErrorFactory.getError(ErrorType.UserNotFound)
        return (user_token < this.getTotalCost(start_time,end_time,costPerHour)) 
                ? false : true

    }

}
        