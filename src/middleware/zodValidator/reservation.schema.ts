import {z} from "zod"
import {enumReservationStatus} from "../../utils/db_const"
import { DateOnHourSchema, GenericStringSchema, refineFromBeforeToSchema, StandarIdSchema, ValidationMessages } from "./utilsValidator"
import { en } from "zod/v4/locales"

export const ReservationIdSchema = z.object({
    id: StandarIdSchema,

})
export type ReservationIdInput = z.infer<typeof ReservationIdSchema>

export const ReservationStatusFilterSchema = z.object({
    status: z.enum(enumReservationStatus),
    from: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: ValidationMessages.date.invalid,
    })
    .transform(val => new Date(val)),
    to: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: ValidationMessages.date.invalid,
    })
    .transform(val => new Date(val)),

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
).refine(
  (data) =>{ 
    const currentHour = new Date(Date.now());
    currentHour.setMinutes(0, 0, 0); 

    return data.start_time.getTime() >= currentHour.getTime();
},
  { message: "La data di inizio deve essere futura", path: ["start"] }
)
export type NewReservationInput = z.infer<typeof NewReservationSchema>


export const UpdateStatusReseservationSchema = z.object({
    id: StandarIdSchema,
    newStatus: z.enum([enumReservationStatus.Approved,enumReservationStatus.Reject]),
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


