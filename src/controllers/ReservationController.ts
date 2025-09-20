import { Request, Response ,NextFunction } from "express";

import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IReservationService } from "../services/serviceInterface/IReservationService";
import { ReservationDataInterface } from "../dto/reservationModel";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { NewReservationInput } from "../middleware/zodValidator/reservation.schema";


export class ReservationController{
    constructor(private ReservationService: IReservationService){}

    newReservation = async(req: Request, res: Response, next: NextFunction) => {
        try {     
        
            const inputValidate = req.body as  unknown as NewReservationInput
            await this.ReservationService.newReservation(inputValidate)

        } catch (error) {
            throw error
        }
    }

    getReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    updateReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    cancelReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    getReservationsFiltered = async(req: Request, res: Response, next: NextFunction) => {
    }


}