import {z} from "zod"
import {enumReservationStatus} from "../../utils/db_const"
import { DateOnHourSchema, GenericStringSchema, refineFromBeforeToSchema, StandarIdSchema, ValidationMessages } from "./utilsValidator"

export const deleteReservationSchema = z.object({
    id: StandarIdSchema,

})
export type deleteReservationInput = z.infer<typeof deleteReservationSchema>

export const ReservationStatusFilterSchema = z.object({
    id: StandarIdSchema,
    status: z.enum(enumReservationStatus),
    created_at: z.iso.datetime()

})
export type ReservationStatusFilterInput = z.infer<typeof ReservationStatusFilterSchema>


export const ReservationOptionalFilterSchema = z.object({
    calendar_id: StandarIdSchema.optional(),
    status: z.enum(enumReservationStatus).optional(),
    from: DateOnHourSchema.optional(),
    to: DateOnHourSchema.optional(),
}).refine(
    refineFromBeforeToSchema("from","to"),
    { message : ValidationMessages.date.fromBeforeTo}
)
export type ReservationOptionalFilterInput = z.infer<typeof ReservationOptionalFilterSchema>


export const NewReservationSchema = z.object({
    calendar_id: StandarIdSchema,
    title: GenericStringSchema,
    start_time: DateOnHourSchema,
    end_time: DateOnHourSchema,
    reason : GenericStringSchema

}).refine(
    refineFromBeforeToSchema("start","end"),
    { message : ValidationMessages.date.fromBeforeTo}
)
export type NewReservationInput = z.infer<typeof NewReservationSchema>


export const UpdateStatusReseservationSchema = z.object({
    id: StandarIdSchema,
    newStatus: z.enum(["approve","reject"]),
    reason : GenericStringSchema.optional()

})
export type UpdateStatusReseservationInput = z.infer<typeof UpdateStatusReseservationSchema>


export const CheckSlotSchema = z.object({
    calendar_id: StandarIdSchema,
    start: DateOnHourSchema,
    end: DateOnHourSchema,

}).refine(
    refineFromBeforeToSchema("start","end"),
    { message : ValidationMessages.date.fromBeforeTo}
)
export type CheckSlotInput = z.infer<typeof CheckSlotSchema>


