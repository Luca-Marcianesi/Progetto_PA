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

            if(!req.user) throw ErrorFactory.getError(ErrorType.Unauthorized)
    
            let reservation = await this.ReservationService.newReservation(inputValidate, req.user.id)

        } catch (error) {
            throw error
        }
    }

    getReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    updateReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    deleteReservations = async(req: Request, res: Response, next: NextFunction) => {
    }

    getReservationsFiltered = async(req: Request, res: Response, next: NextFunction) => {
    }


}