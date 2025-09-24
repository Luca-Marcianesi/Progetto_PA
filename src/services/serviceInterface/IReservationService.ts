import { DomainReservation } from "../../domain/reservation"
import { NewReservationInput, ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../../middleware/zodValidator/reservation.schema"
import { Reservation } from "../../models/Reservation"
import { enumReservationStatus } from "../../utils/db_const"

export interface IReservationService {
    newReservation(reservationData : NewReservationInput,user_id: number):Promise<DomainReservation | never>

    updatteReservation(id: number, newStatus: string, approvedBy: number, reason?: string):Promise<void>

    deleteReservation(reservation_id: number, requestSender : number):Promise<void>

    getReservationOptionalFilter(filter : ReservationOptionalFilterInput):Promise<DomainReservation[]>

    getReservationsFilterStatus(filter : ReservationStatusFilterInput): Promise<DomainReservation[]>

    getReservationsByCal(id: number):Promise<DomainReservation[]>


}