import { Request, Response ,NextFunction } from "express";
import { IReservationService } from "../services/serviceInterface/IReservationService";
import { NewReservationInput, ReservationStatusFilterInput, ReservationOptionalFilterInput ,UpdateStatusReseservationInput, ReservationIdInput } from "../middleware/zodValidator/reservation.schema";
import { StatusCodes } from "http-status-codes";
import { getUtenteId } from "../utils/functions";


export class ReservationController{
    constructor(private ReservationService: IReservationService){}

    newReservation = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as NewReservationInput
    
            let reservation = await this.ReservationService.newReservation(inputValidate, getUtenteId(req))

            res.status(StatusCodes.CREATED).json({
                            message:"Creato con successo",
                            object: reservation
                        })

        } catch (error) {
            throw error
        }
    }

    

    updateReservations = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateStatusReseservationInput


            await this.ReservationService.updatteReservation(
                inputValidate.id,inputValidate.newStatus,getUtenteId(req),inputValidate.reason)

            res.status(StatusCodes.ACCEPTED).json({message:"Prenotazione aggiornata"})

        } catch (error) {
            throw error
        }

    }

    deleteReservations = async(req: Request, res: Response, next: NextFunction) => {

        try {     
            const inputValidate = req.params as  unknown as ReservationIdInput


            await this.ReservationService.deleteReservation(inputValidate.id,getUtenteId(req) )

            res.status(StatusCodes.ACCEPTED).json({
                message: "Prenotazione eliminata"
            })

        } catch (error) {
            throw error
        }
        
    }
    getReservationsFilterStatus = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const filter = req.query as  unknown as ReservationStatusFilterInput

            let reservation = await this.ReservationService.getReservationsFilterStatus(filter)

            res.status(StatusCodes.ACCEPTED).json({
                reservation : reservation
            })

        } catch (error) {
            throw error
        }

    }

    getReservationsOptionalFiter = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const filter = req.body as  unknown as ReservationOptionalFilterInput


            let reservation = await this.ReservationService.getReservationOptionalFilter(filter)

            res.status(StatusCodes.ACCEPTED).json({
                reservation: reservation
            })

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



}