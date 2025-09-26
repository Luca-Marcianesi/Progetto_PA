
import { Reservation } from "../../models/reservationModel";
import { Calendar } from "../../models/calendarModel";
import { EnumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../../middleware/zodValidator/reservation.schema";

export interface IReservationRepository{
    insertResevation(reservation: DomainReservation , status: EnumReservationStatus): Promise<DomainReservation | never>;

    findReservationApprovedByCalendarId(calendarId: number): Promise<DomainReservation[]>

    findReservationById(ReservationId : number): Promise<DomainReservation | null>

    findReservationsByCalendar(calendarId: number): Promise<DomainReservation[]>

    saveReservation(reservation: DomainReservation): Promise<void>

    findReservationStatusFiltered(filter: ReservationStatusFilterInput): Promise<DomainReservation[]>

    findReservationOptionalFilter(filter: ReservationOptionalFilterInput): Promise<DomainReservation[]>

}