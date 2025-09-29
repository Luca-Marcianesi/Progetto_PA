import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CalendarIdInput, CreateCalendarInput, UpdateCalendarEndInput } from "../middleware/zodValidator/calendar.schema";
import { CheckSlotInput } from "../middleware/zodValidator/reservation.schema";

export class CalendarController {
    constructor (private calendarService: ICalendarService) { }


    createCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CreateCalendarInput
    
            let calendar = await this.calendarService.createCalendar(inputValidate)

            res.status(StatusCodes.CREATED).json({
                message:"Creato con successo",
                calendar: calendar
            })

        } catch (error) {
            throw error
        }
    }

    cancelCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.params as  unknown as CalendarIdInput
    
            await this.calendarService.deleteCalendar(inputValidate.calendarId)

            res.status(StatusCodes.ACCEPTED).json({
                message: "Calendario eliminato"
            })

        } catch (error) {
            throw error
        }
    }

    unarchiveCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.params as  unknown as CalendarIdInput
    
            await this.calendarService.unarchiveCalendar(inputValidate.calendarId)

            res.status(StatusCodes.ACCEPTED).json({
                message : "Calendario ripristinato"
            })

        } catch (error) {
            throw error
        }
    }

    getCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {

            const inputValidate = req.query as  unknown as CalendarIdInput
            
            let calendar = await this.calendarService.getCalendarById(inputValidate.calendarId)

            res.status(StatusCodes.OK).json({
                calendar : calendar
            })
     

        } catch (error) {
            throw error
        }
    }

    updateEndCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateCalendarEndInput
    
            await this.calendarService.updateEndCalendar(inputValidate.calendarId,inputValidate.end)

            res.status(StatusCodes.ACCEPTED).json({ message: "Calendario aggiornato"})

        } catch (error) {
            throw error
        }
    }

    checkSclot = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.query as  unknown as CheckSlotInput
    
            let isFree =
             await this.calendarService.checkSlotAvaiability(inputValidate.calendar_id,inputValidate.start,inputValidate.end)

            let message = isFree ? "free" : "occupated"

            res.status(StatusCodes.ACCEPTED).json({
                message: message
            })

        } catch (error) {
            throw error
        }
    }

}

