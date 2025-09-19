import { ReservationDataInterface } from "../dto/reservationModel";
import { Reservation } from "../models/Reservation";
import { enumReservationStatus } from "../utils/db_const";
import { IReservationDAO } from "./daoInterface/IReservationDAO";

export class ReservationDAO implements IReservationDAO{
    async insert(reservation: ReservationDataInterface, status: enumReservationStatus): Promise<Reservation > {
        return await Reservation.create(
            {
                user_id: reservation.user_id,
                calendar_id: reservation.calendar_id,
                start_time:reservation.start_time,
                end_time: reservation.end_time,
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

    async updateStatus(id: number, status: string): Promise<void> {
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