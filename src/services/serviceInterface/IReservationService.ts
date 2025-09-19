import { ReservationDataInterface } from "../../dto/reservationModel"
import { Reservation } from "../../models/Reservation"

export interface IReservationService {
    newReservation(reservationData : ReservationDataInterface):Promise<Reservation | never>

    approveReservation(id: number, approvedBy: number):Promise<void>

    rejectReservation(id: number, rejectedBy: number, reason: string):Promise<void>
}