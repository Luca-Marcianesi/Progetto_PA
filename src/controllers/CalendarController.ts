import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CalendarIdInput, CreateCalendarInput, UpdateCalendarCostInput, UpdateCalendarEndInput } from "../middleware/zodValidator/calendar.schema";
import { CalendarNotExistError } from "../middleware/errors/ExtendedError";
import { CheckSlotInput } from "../middleware/zodValidator/reservation.schema";
export class CalendarController {
    constructor (private calendarService: ICalendarService) { }

    createCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CreateCalendarInput
    
            let calendar = await this.calendarService.createCalendar(inputValidate)

        } catch (error) {
            throw error
        }
    }

    cancelCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CalendarIdInput
    
            let calendar = await this.calendarService.deleteCalendar(req.body)

        } catch (error) {
            throw error
        }
    }

    archiveCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CalendarIdInput
    
            let calendar = await this.calendarService.archiveCalendar(req.body)

        } catch (error) {
            throw error
        }
    }

    getCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CalendarIdInput
    
            let calendar = await this.calendarService.getCalendarById(req.body)

        } catch (error) {
            throw error
        }
    }

    updateCalendarCost = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateCalendarCostInput
    
            let calendar = await this.calendarService.updateCostCalendar(inputValidate.calendar_id,inputValidate.cost)

        } catch (error) {
            throw error
        }
    }

    updateCalendaEnd = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateCalendarEndInput
    
            let calendar = await this.calendarService.updateEndCalendar(inputValidate.calendar_id,inputValidate.end)

        } catch (error) {
            throw error
        }
    }

    checkSclot = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CheckSlotInput
    
            let calendar = await this.calendarService.checkSlotAvaiability(inputValidate.calendar_id,inputValidate.start,inputValidate.end)

        } catch (error) {
            throw error
        }
    }

}

