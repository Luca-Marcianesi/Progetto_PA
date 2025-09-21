//import { ReservationModel } from "../../dto/reservationModel";
import { ReservationDataInterface } from "../../dto/reservationModel";
import { Reservation } from "../../models/Reservation";
import { Calendar } from "../../models/Calendar";
import { enumReservationStatus } from "../../utils/db_const";
import { DomainReservation } from "../../domain/reservation";

export interface IReservationRepository{
    insertResevation(reservation: DomainReservation , status: enumReservationStatus): Promise<DomainReservation | never>;


    calcel():Promise<void | never>;
    approve(): Promise<void | never>;
    reject(reason : string): Promise<void>;


    findConflictsSlots(calendar_id: Number, start_time: Date, end_time: Date): Promise<Reservation[]>

    findReservationById(reservation_id : number): Promise<DomainReservation | null>

    saveReservation(reservation: DomainReservation): Promise<void>

}