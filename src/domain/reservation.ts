import { Reservation as ReservationModel } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
import {ApprovedState, IReservationState, PendingState, RejectedState} from "../utils/stateReservation"

interface StateData  {
    id: number,
    status: enumReservationStatus,
    apprOrRejBy?: number,
    reason? : string

}

export class DomainReservation {
    id: number
    status: enumReservationStatus
    apprOrRejBy?: number
    reason? : string

    private state: IReservationState;

    constructor(data: StateData){
        this.id = data.id;
        this.status = data.status;
        this.apprOrRejBy = data.apprOrRejBy
        this.reason = data.reason

        switch(data.status){
            case enumReservationStatus.Approved:
                this.state = new ApprovedState();
                break
            case enumReservationStatus.Reject:
                this.state = new RejectedState();
                break
            default:
                this.state = new PendingState()

        }
    }

    setState(state: IReservationState, newStatus : enumReservationStatus){
        this.state = state
        this.status = newStatus
    }


    approve(userId : number){
        this.state.approve(this, userId)
    }

    reject(user_id: number, reason: string){
        this.state.reject(this,user_id,reason)
    }

}