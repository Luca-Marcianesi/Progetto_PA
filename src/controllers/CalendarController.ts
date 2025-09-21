import { ICalendarService } from "../services/serviceInterface/ICalendarService";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
export class CalendarController {
    constructor (private calendarService: ICalendarService) { }

    createCalendar = async(req: Request, res: Response, next: NextFunction) => {
    }

    cancelCalendar = async(req: Request, res: Response, next: NextFunction) => {
    }

    archiveCalendar = async(req: Request, res: Response, next: NextFunction) => {
    }

    getCalendar = async(req: Request, res: Response, next: NextFunction) => {
    }

    udateCalendarCost = async(req: Request, res: Response, next: NextFunction) => {
    }

    updateCalendaEnd = async(req: Request, res: Response, next: NextFunction) => {
    }

    checkSclot = async(req: Request, res: Response, next: NextFunction) => {
    }

}

