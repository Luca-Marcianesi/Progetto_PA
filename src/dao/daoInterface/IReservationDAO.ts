import { Reservation } from "../../models/reservationModel";
import { EnumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../../middleware/zodValidator/reservation.schema";

export interface IReservationDAO{
    insert(reservation: DomainReservation,status: EnumReservationStatus):Promise<Reservation>;
    updateStatus(id: number , status: string): Promise<void>;
    cancel(id: number ): Promise<void>;
    findByPk(id: number): Promise<Reservation | null>;
    getReservatisByCalendarId(calendarId: number): Promise<Reservation[]>
    getReservationApproved(calendarId: number): Promise<Reservation[]>
    saveUpdatedReservation(reservation : DomainReservation): Promise<void>
    getReservationOptinalFilter(filters: ReservationOptionalFilterInput): Promise<Reservation[]>
    getReservationStatusFilter(filters: ReservationStatusFilterInput): Promise<Reservation[]>
}