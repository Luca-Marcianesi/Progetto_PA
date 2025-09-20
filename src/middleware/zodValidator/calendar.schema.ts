import {z} from "zod"
import { StandarIdSchema, DateOnHourSchema,ValidationMessages,refineFromBeforeToSchema } from "./utilsValidator"

export const CalendaIdSchema = z.object({
    calendar_id: StandarIdSchema
})
export type CalendarIdInput = z.infer<typeof CalendaIdSchema>


export const CreateCalendarSchema = z.object({
    calendar_id: StandarIdSchema,
    resource_id : StandarIdSchema,
    start: DateOnHourSchema.optional(),
    end: DateOnHourSchema.optional(),
    
}).refine(
    refineFromBeforeToSchema("start","end"),
    { message : ValidationMessages.date.fromBeforeTo}
)
export type CreateCalendarInput = z.infer<typeof CreateCalendarSchema>


export const UpdateCalendaCostSchema = z.object({
    calendar_id: StandarIdSchema,
    cost: z.number().int().positive()

})
export type UpdateCalendarCostInput = z.infer<typeof UpdateCalendaCostSchema>


export const UpdateCalendarEndSchema = z.object({
    calendar_id: StandarIdSchema,
    end: DateOnHourSchema.optional(),
})
export type UpdateCalendarEndInput = z.infer<typeof UpdateCalendarEndSchema>