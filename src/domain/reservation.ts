import { Reservation, Reservation as ReservationModel } from "../models/reservationModel";
import { EnumReservationStatus } from "../utils/db_const";
import { IReservationState} from "./stateReservation/IReservationState"
import { ApprovedState } from "./stateReservation/states/approvedState";
import { CancelState } from "./stateReservation/states/cancelState";
import { InvalidState } from "./stateReservation/states/invalidState";
import { PendingState } from "./stateReservation/states/pendingState";
import { RejectedState } from "./stateReservation/states/rejectedState";

interface reservationInput{
    id: number
    calendar_id: number
    start: Date
    end: Date
    title: string
    reservationBy : number
    status: EnumReservationStatus
    handledBy?: number
    rejectReason?: string

}
export class DomainReservation {
    public id: number
    public calendarId: number
    public start: Date
    public end: Date
    public title: string
    public reservationBy : number
    state: IReservationState
    public handledBy?: number
    public rejectReason?: string

    constructor(reservation: reservationInput){
        this.id = reservation.id,
        this.calendarId = reservation.calendar_id,
        this.start = reservation.start
        this.end = reservation.end
        this.title = reservation.title
        this.reservationBy = reservation.reservationBy
        this.state = DomainReservation.mapStatus(reservation.status)
    }
    
    // Adapter from the Sequelize Model to the Domain Model
    static fromPersistence(reservation : Reservation){
        return new DomainReservation({
            id: reservation.id,
            calendar_id : reservation.calendar_id,
            start: reservation.start_time,
            end: reservation.end_time,
            title: reservation.title,
            status : reservation.status,
            reservationBy: reservation.user_id
    })
    }

    // Override to print the json object differently
    toJSON(){
        return {
            calendar : this.calendarId,
            title: this.title,
            start: this.start,
            end: this.end,
            state: this.state.getStatus()
        }
    }

    // Return the StateClass for imlplementing the Pattern State
    static mapStatus(status: string) {
    switch (status) {
      case EnumReservationStatus.Pending: return new PendingState();
      case EnumReservationStatus.Approved: return new ApprovedState();
      case EnumReservationStatus.Reject: return new RejectedState();
      case EnumReservationStatus.Calcel: return new CancelState();
      default: return new InvalidState();
    }
  }


    setState(state: IReservationState){
        this.state = state
    }

    setApprovedBy(userId: number) {
        this.handledBy = userId;
    }

    setRejectedBy(userId: number, reason: string) {
        this.handledBy = userId;
        this.rejectReason = reason;
    }

    // Check if the reservation is active and approved
    isActive(): boolean{
        return (this.start.getTime()< Date.now() &&
         Date.now() <  this.end.getTime() &&
          this.state.getStatus() === EnumReservationStatus.Approved)
    }

    // Check if the reservation is waiting to start and is approved
    isWaitingToStart(): boolean{
        return (Date.now() < this.start.getTime() && this.state.getStatus() === EnumReservationStatus.Approved )
    }

    isAfter(date: Date): boolean{
        return (this.end.getTime()> date.getTime())
    }

    startAfter(date: Date): boolean{
        return (this.start.getTime()> date.getTime())
    }

    getHours() : number{
        return (this.end.getTime() - this.start.getTime())/(3600*1000)
    }

    getHoursNotUsed(): number{
        if(this.start.getTime() > Date.now()) return this.getHours()

        if(this.end.getTime()< Date.now()) return 0
        
        //Ore restanti approssimate per eccesso
        return Math.ceil(
            (this.end.getTime() - Date.now())/(3600*1000)
        )

        
        
    }

    // Check if this reservation overlaps wih the one in input
    overlaps(other: DomainReservation): boolean {

        return this.start < other.end && this.end > other.start;
    }

    getState(){
        return this.state
    }

    getStatus(){
        return this.state.getStatus()
    }

    approve(approvedBy : number){
        this.state.approve(this, approvedBy)
    }

    reject(rejectBy: number, reason: string){
        this.state.reject(this, rejectBy ,reason)
    }

    cancel(){
        this.state.cancel(this)
    }
}