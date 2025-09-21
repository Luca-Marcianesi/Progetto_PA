import { DomainReservation } from "../../domain/reservation"
import { NewReservationInput } from "../../middleware/zodValidator/reservation.schema"
import { Reservation } from "../../models/Reservation"
import { enumReservationStatus } from "../../utils/db_const"

export interface IReservationService {
    newReservation(reservationData : NewReservationInput,user_id: number):Promise<DomainReservation | never>

    updatteReservation(id: number, approvedBy: number, reason?: string):Promise<void>

    getReservationsFilterStatus(calendar_id: number,state: enumReservationStatus,created_at: Date ): Promise<DomainReservation[]>

    deleteReservation(reservation_id: number):Promise<void>

    getReservationFiltered():Promise<DomainReservation[]>

    getReservationsByCal():Promise<DomainReservation[]>


}