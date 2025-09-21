import {z} from "zod"
import { StandarIdSchema, DateOnHourSchema,ValidationMessages,refineFromBeforeToSchema, GenericStringSchema } from "./utilsValidator"
import { title } from "process"

export const CalendaIdSchema = z.object({
    calendar_id: StandarIdSchema
})
export type CalendarIdInput = z.infer<typeof CalendaIdSchema>


export const CreateCalendarSchema = z.object({
    resource_id : StandarIdSchema,
    cost_per_hour: z.number().int().positive(),
    start: DateOnHourSchema,
    end: DateOnHourSchema,
    title: GenericStringSchema
    
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