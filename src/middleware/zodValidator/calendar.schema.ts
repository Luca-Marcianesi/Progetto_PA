import {z} from "zod"
import { StandarIdSchema, DateOnHourSchema,ValidationMessages, GenericStringSchema } from "./utilsValidator"

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
    
}).refine((data) => data.start.getTime() < data.end.getTime(), {
  message: "La data di inizio deve essere precedente alla fine",
  path: ["start"],
}).refine(
  (data) => data.start.getTime() > Date.now(),
  { message: "La data di inizio deve essere futura", path: ["start"] }
)
export type CreateCalendarInput = z.infer<typeof CreateCalendarSchema>



export const UpdateCalendarEndSchema = z.object({
    calendarId: StandarIdSchema,
    end: DateOnHourSchema
}).refine(
  (data) => data.end.getTime() > Date.now(),
  { message: "La data di fine deve essere futura", path: ["end"] }
)
export type UpdateCalendarEndInput = z.infer<typeof UpdateCalendarEndSchema>