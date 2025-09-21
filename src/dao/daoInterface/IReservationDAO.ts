import { ListFormat } from "typescript";
import { ReservationDataInterface } from "../../dto/reservationModel";
import { Reservation } from "../../models/Reservation";
import { enumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";

export interface IReservationDAO{
    insert(reservation: DomainReservation,status: enumReservationStatus):Promise<Reservation>;
    updateStatus(id: number , status: string): Promise<void>;
    cancel(id: number ): Promise<void>;
    findByPk(id_: number): Promise<Reservation | null>;
    getReservatisByCalendarId(calendar_id: number): Promise<Reservation[]>
}