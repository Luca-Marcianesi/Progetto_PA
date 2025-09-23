import { start } from "repl";
import { Calendar } from "../models/Calendar";
import { Reservation, Reservation as ReservationModel } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
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
    status: enumReservationStatus
    handledBy?: number
    rejectReason?: string

}
export class DomainReservation {
    public id: number
    public calendar_id: number
    public start: Date
    public end: Date
    public title: string
    public reservationBy : number
    state: IReservationState
    public handledBy?: number
    public rejectReason?: string

    constructor(reservation: reservationInput){
        this.id = reservation.id,
        this.calendar_id = reservation.calendar_id,
        this.start = reservation.start
        this.end = reservation.end
        this.title = reservation.title
        this.reservationBy = reservation.reservationBy
        this.state = DomainReservation.mapStatus(reservation.status)
    }
    

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

    getUserOutput(){
        return {
            calendar : this.calendar_id,
            title: this.title,
            start: this.start,
            end: this.end,
            state: this.state.getStatus()
        }
    }

    static mapStatus(status: string) {
    switch (status) {
      case enumReservationStatus.Pending: return new PendingState();
      case enumReservationStatus.Approved: return new ApprovedState();
      case enumReservationStatus.Reject: return new RejectedState();
      case enumReservationStatus.Calcel: return new CancelState();
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

    isActive(): boolean{
        return (this.start.getTime()< Date.now() &&
         Date.now() <  this.end.getTime() &&
          this.state.getStatus() === enumReservationStatus.Approved)
    }

    isWaitingToStart(): boolean{
        return (Date.now() < this.start.getTime() && this.state.getStatus() === enumReservationStatus.Approved )
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

    overlaps(other: DomainReservation): boolean {

        console.log("confronto:" + this.start + this.end)
        console.log("con:" + other.start + other.end)
        let res = this.start < other.end && this.end > other.start;
        console.log("sovrapposizione" + res)
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

    calculateFineTokens(): number{
        let tokensFine = 1
        if(this.start.getTime() < Date.now() && Date.now() < this.end.getTime())  tokensFine = 2
        return tokensFine

    }

}