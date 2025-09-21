import { DomainReservation } from "../../domain/reservation"
import { ReservationDataInterface } from "../../dto/reservationModel"
import { NewReservationInput } from "../../middleware/zodValidator/reservation.schema"
import { Reservation } from "../../models/Reservation"

export interface IReservationService {
    newReservation(reservationData : NewReservationInput,user_id: number):Promise<DomainReservation | never>

    approveReservation(id: number, approvedBy: number):Promise<void>

    rejectReservation(id: number, rejectedBy: number, reason: string):Promise<void>
}