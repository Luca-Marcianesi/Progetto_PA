import { Op } from "sequelize";
import { DomainReservation } from "../domain/reservation";
import { ReservationOptionalFilterInput, ReservationStatusFilterInput } from "../middleware/zodValidator/reservation.schema";
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

    async saveUpdatedReservation(reservation: DomainReservation): Promise<void> {
        await Reservation.update(
            {
                handled_by: reservation.handledBy,
                status: reservation.getStatus(),
                reason: reservation.rejectReason

            },{
                where: {id: reservation.id}
            }
        )
    }

    async findByPk(id_: number): Promise<Reservation | null> {
        return await Reservation.findByPk(id_)
        
    }

    async getReservationOptinalFilter(filters: ReservationOptionalFilterInput): Promise<Reservation[]> {
        const where: any = {};
        if (filters.calendar_id) where.calendar_id = filters.calendar_id;
        if (filters.status) where.status = filters.status;
        if (filters.from && filters.to) {
        where.start = { [Op.gte]: filters.from };
        where.end = { [Op.lte]: filters.to };
        }
        return Reservation.findAll({ where });

    }

    async getReservationStatusFilter(filters: ReservationStatusFilterInput): Promise<Reservation[]> {
        return await Reservation.findAll({
            where:{
                status: filters.status,
                createdAt: {
                [Op.between]: [filters.from, filters.to]
  }
            }
        })
        
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

    async getReservationApproved(calendar_id: number): Promise<Reservation[]> {
        return await Reservation.findAll(
            {
                where:{
                    calendar_id : calendar_id,
                    status: enumReservationStatus.Approved

                }
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