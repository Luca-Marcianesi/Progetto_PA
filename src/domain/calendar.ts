import { CalendaIdSchema } from "../middleware/zodValidator/calendar.schema"
import { Calendar } from "../models/calendarModel"
import { DomainReservation } from "./reservation"

interface DomainCalendarInput {
    id: number
    resource_id: number
    start_time: Date
    end_time: Date
    cost: number
    title: string
    archived?: boolean

}

export class DomainCalendar{

    public id: number
    public resource_id: number
    public start_time: Date
    public end_time: Date
    public cost: number
    public title: string
    public archive: boolean = false
    public reservations :  DomainReservation[] = []

    constructor(calendar : DomainCalendarInput)
    { 
        this.id = calendar.id,
        this.resource_id = calendar.resource_id,
        this.start_time = calendar.start_time,
        this.end_time = calendar.end_time,
        this.cost = calendar.cost
        this.title = calendar.title
        this.archive = calendar.archived ?? false
    }

    static fromPersistence(calendar : Calendar){
        return new DomainCalendar({
        id: calendar.id,
        resource_id : calendar.resource_id,
        start_time: calendar.start_time,
        end_time: calendar.end_time,
        cost: calendar.cost_per_hour,
        title: calendar.title,
        archived: calendar.archived 
    })

    }

    addReservations(reservations: DomainReservation[]) {
        this.reservations.push(...reservations);
    }

}
