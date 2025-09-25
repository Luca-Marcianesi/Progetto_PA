import { CalendaIdSchema } from "../middleware/zodValidator/calendar.schema"
import { Calendar } from "../models/calendarModel"
import { DomainReservation } from "./reservation"

interface DomainCalendarInput {
    id: number
    resourceId: number
    start: Date
    end: Date
    cost: number
    title: string
    archived?: boolean

}

export class DomainCalendar{

    public id: number
    public resourceId: number
    public start: Date
    public end: Date
    public cost: number
    public title: string
    public archive: boolean = false
    public reservations :  DomainReservation[] = []

    constructor(calendar : DomainCalendarInput)
    { 
        this.id = calendar.id,
        this.resourceId = calendar.resourceId,
        this.start = calendar.start,
        this.end = calendar.end,
        this.cost = calendar.cost
        this.title = calendar.title
        this.archive = calendar.archived ?? false
    }

    // Adapter from the Sequelize Model to the Domain Model
    static fromPersistence(calendar : Calendar){
        return new DomainCalendar({
        id: calendar.id,
        resourceId : calendar.resource_id,
        start: calendar.start_time,
        end: calendar.end_time,
        cost: calendar.cost_per_hour,
        title: calendar.title,
        archived: calendar.archived 
    })

    }

    addReservations(reservations: DomainReservation[]) {
        this.reservations.push(...reservations);
    }

}
