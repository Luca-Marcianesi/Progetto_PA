import { DomainReservation } from "../domain/reservation";
import { Reservation } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
import { IReservationDAO } from "./daoInterface/IReservationDAO";

export class ReservationDAO implements IReservationDAO{
    async insert(reservation: DomainReservation, status: enumReservationStatus): Promise<Reservation > {
        return await Reservation.create(
            {
                user_id: reservation.reservationBy,
                calendar_id: reservation.calendar_id,
                start_time:reservation.start,
                end_time: reservation.end,
                title: reservation.title,
                status: status

            }
        )
        
    }

    async findByPk(id_: number): Promise<Reservation | null> {
        return await Reservation.findByPk(id_)
        
    }

    async cancel(id: number): Promise<void> {
        await Reservation.destroy({
            where: {id: id}
    })  
    }


    async getReservatisByCalendarId(calendar_id: number): Promise<Reservation[]> {
        return await Reservation.findAll(
            {
                where:{calendar_id : calendar_id}
            }
        )
        
    }

    async updateStatus(id: number, status: enumReservationStatus): Promise<void> {
        await Reservation.update(
            {
                status: status
            },
            {
                where: {id : id}
            }
        )
        
    }

}