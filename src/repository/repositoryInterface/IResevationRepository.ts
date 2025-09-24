
import { Reservation } from "../../models/reservationModel";
import { Calendar } from "../../models/calendarModel";
import { enumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../../middleware/zodValidator/reservation.schema";

export interface IReservationRepository{
    insertResevation(reservation: DomainReservation , status: enumReservationStatus): Promise<DomainReservation | never>;

    calcel():Promise<void | never>;

    approve(): Promise<void | never>;

    reject(reason : string): Promise<void>;

    findReservationApprovedByCalendarId(calendar_id: number): Promise<DomainReservation[]>

    findReservationById(reservation_id : number): Promise<DomainReservation | null>

    findReservationsByCalendar(calendar_id: number): Promise<DomainReservation[]>

    saveReservation(reservation: DomainReservation): Promise<void>

    findReservationStatusFiltered(filter: ReservationStatusFilterInput): Promise<DomainReservation[]>

    findReservationOptionalFilter(filter: ReservationOptionalFilterInput): Promise<DomainReservation[]>

}