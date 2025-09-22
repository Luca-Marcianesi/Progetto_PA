import { Reservation as ReservationModel } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
import { IReservationState} from "./stateReservation/IReservationState"
import { PendingState } from "./stateReservation/states/pendingState";
export class DomainReservation {

    private state : IReservationState

    constructor(
       public calendar_id: number,
       public start: Date,
       public end: Date,
       public title: string,
       public reservationBy : number,
       public id?: number,
       public handledBy?: number,
       public rejectReason?: string,
       state?: IReservationState
    ){
        this.state = state ??  new PendingState()
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