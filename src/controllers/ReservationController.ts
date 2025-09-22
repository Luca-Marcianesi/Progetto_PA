import { Request, Response ,NextFunction } from "express";

import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IReservationService } from "../services/serviceInterface/IReservationService";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";
import { NewReservationInput, ReservationStatusFilterInput, UpdateStatusReseservationInput, ReservationIdInput } from "../middleware/zodValidator/reservation.schema";
import { StatusCodes } from "http-status-codes";


export class ReservationController{
    constructor(private ReservationService: IReservationService){}

    newReservation = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as NewReservationInput
    
            let reservation = await this.ReservationService.newReservation(inputValidate, this.getUtenteId(req))

            res.status(StatusCodes.CREATED).json({
                            message:"Creato con successo",
                            object: reservation.getUserOutput()
                        })

        } catch (error) {
            throw error
        }
    }

    getReservationsFilterStatus = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as ReservationStatusFilterInput

            let {id, created_at, status} = inputValidate

            let reservation = await this.ReservationService.getReservationsFilterStatus(id,status,created_at)

        } catch (error) {
            throw error
        }

    }

    updateReservations = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateStatusReseservationInput


            let reservation = await this.ReservationService.updatteReservation(inputValidate.id,inputValidate.newStatus,this.getUtenteId(req),inputValidate.reason)

            res.status(StatusCodes.ACCEPTED).json({message:"Prenotazione aggiornata"})

        } catch (error) {
            throw error
        }

    }

    deleteReservations = async(req: Request, res: Response, next: NextFunction) => {

        try {     
            const inputValidate = req.body as  unknown //as ReservationIdInput


            let reservation = await this.ReservationService.deleteReservation(req.body)

        } catch (error) {
            throw error
        }
        
    }

    getReservationsFiltered = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown //as ReservationOptionalFilterInput


            let reservation = await this.ReservationService.getReservationFiltered()

        } catch (error) {
            throw error
        }
        
    }

    getReservationsByCal = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.query as  unknown as ReservationIdInput


            let reservation = await this.ReservationService.getReservationsByCal(inputValidate.id)

        } catch (error) {
            throw error
        }

    }

    private getUtenteId(req: Request): number{
        if(!req.user) throw ErrorFactory.getError(ErrorType.Unauthorized)
        
        return req.user.id
    }


}