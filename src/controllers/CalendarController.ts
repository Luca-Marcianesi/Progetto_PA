import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CalendarIdInput, CreateCalendarInput, UpdateCalendarCostInput, UpdateCalendarEndInput } from "../middleware/zodValidator/calendar.schema";
import { CheckSlotInput } from "../middleware/zodValidator/reservation.schema";
import { ResourceDAO } from "../dao/resourceDAO"
import { CalendarDAO } from "../dao/calendarDAO";
import { UserDAO } from "../dao/userDAO";
import { ReservationDAO } from "../dao/reservationDAO";
export class CalendarController {
    constructor (private calendarService: ICalendarService) { }


    test = async (req: Request, res: Response, next: NextFunction) => {
        try {   
            
            let dao = new ResourceDAO()
            let cal_dao = new CalendarDAO()
            let user_dao = new UserDAO()
            let res_dao = new ReservationDAO()
            let users = await user_dao.getUsers()
            let reser = await res_dao.getAll()
            let cal = await cal_dao.getAll()

            res.status(StatusCodes.CREATED).json({
                users: users,
                reser : reser,
                cal : cal
            })

        } catch (error) {
            throw error
        }
    }

    createCalendar = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as CreateCalendarInput
    
            let calendar = await this.calendarService.createCalendar(inputValidate)

            res.status(StatusCodes.CREATED).json({
                message:"Creato con successo",
                object: calendar
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
            const inputValidate = req.body as  unknown as CalendarIdInput
    
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

    updateCalendarCost = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateCalendarCostInput
    
            let calendar = await this.calendarService.updateCostCalendar(inputValidate.calendarId,inputValidate.cost)

        } catch (error) {
            throw error
        }
    }

    updateCalendaEnd = async(req: Request, res: Response, next: NextFunction) => {
        try {     
            const inputValidate = req.body as  unknown as UpdateCalendarEndInput
    
            let calendar = await this.calendarService.updateEndCalendar(inputValidate.calendarId,inputValidate.end)

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

