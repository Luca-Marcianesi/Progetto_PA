import { NextFunction } from "express";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IReservationService } from "../services/serviceInterface/IReservationService";
import { ReservationDataInterface } from "../dto/reservationModel";

export class ReservationController{
    constructor(private ReservationService: IReservationService){}

    newReservation = async(req: Request, res: Response, next: NextFunction) => {

        const {calendar_id, user_id,  title,  start_time,  end_time, status}  = req.body as unknown as ReservationDataInterface
        await this.ReservationService.newReservation({
            calendar_id,  user_id,
            title, start_time, 
            end_time, status

        })
    }
}