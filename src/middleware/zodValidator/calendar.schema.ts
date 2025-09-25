import {z} from "zod"
import { StandarIdSchema, DateOnHourSchema,ValidationMessages,refineFromBeforeToSchema, GenericStringSchema } from "./utilsValidator"

export const CalendaIdSchema = z.object({
    calendarId: StandarIdSchema
})
export type CalendarIdInput = z.infer<typeof CalendaIdSchema>


export const CreateCalendarSchema = z.object({
    resourceId : StandarIdSchema,
    costPerHour: z.number().int().positive(),
    start: DateOnHourSchema,
    end: DateOnHourSchema,
    title: GenericStringSchema
    
}).refine(
    refineFromBeforeToSchema("start","end"),
    { message : ValidationMessages.date.fromBeforeTo}
).refine(
  (data) => data.start.getTime() > Date.now(),
  { message: "La data di inizio deve essere futura", path: ["start"] }
)
export type CreateCalendarInput = z.infer<typeof CreateCalendarSchema>


export const UpdateCalendaCostSchema = z.object({
    calendarId: StandarIdSchema,
    cost: z.number().int().positive()

})
export type UpdateCalendarCostInput = z.infer<typeof UpdateCalendaCostSchema>


export const UpdateCalendarEndSchema = z.object({
    calendarId: StandarIdSchema,
    end: DateOnHourSchema
})
export type UpdateCalendarEndInput = z.infer<typeof UpdateCalendarEndSchema>