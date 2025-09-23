import { Reservation } from "../../models/Reservation";
import { enumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../../middleware/zodValidator/reservation.schema";

export interface IReservationDAO{
    insert(reservation: DomainReservation,status: enumReservationStatus):Promise<Reservation>;
    updateStatus(id: number , status: string): Promise<void>;
    cancel(id: number ): Promise<void>;
    findByPk(id_: number): Promise<Reservation | null>;
    getReservatisByCalendarId(calendar_id: number): Promise<Reservation[]>
    getReservationApproved(calendar_id: number): Promise<Reservation[]>
    saveUpdatedReservation(reservation : DomainReservation): Promise<void>
    getReservationOptinalFilter(filters: ReservationOptionalFilterInput): Promise<Reservation[]>
    getReservationStatusFilter(filters: ReservationStatusFilterInput): Promise<Reservation[]>
}