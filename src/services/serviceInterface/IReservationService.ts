import { ReservationDataInterface } from "../../dto/reservationModel"
import { Reservation } from "../../models/Reservation"
import {InputNewReservation} from "../../utils/input_validator/reservaionSchema"

export interface IReservationService {
    newReservation(reservationData : InputNewReservation):Promise<Reservation | never>

    approveReservation(id: number, approvedBy: number):Promise<void>

    rejectReservation(id: number, rejectedBy: number, reason: string):Promise<void>
}