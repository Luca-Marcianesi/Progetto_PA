import { Reservation as ReservationModel } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
import { IReservationState} from "./stateReservation/IReservationState"
import { PendingState } from "./stateReservation/states/pendingState";
export class DomainReservation {

    private state : IReservationState

    constructor(
       public id: number,
       public calendar_id: number,
       public start: Date,
       public end: Date,
       public title: string,
       public reservationBy : number,
       public handledBy?: number,
       public rejectReason?: string,
       state?: IReservationState
    ){
        this.state = state ??  new PendingState()
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

    setCancelled() {
        // logica di cancellazione
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