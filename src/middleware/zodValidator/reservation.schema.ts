import {z} from "zod"
import {EnumReservationStatus} from "../../utils/db_const"
import { DateOnHourSchema, GenericStringSchema, StandarIdSchema, ValidationMessages } from "./utilsValidator"

export const ReservationIdSchema = z.object({
    id: StandarIdSchema,

})
export type ReservationIdInput = z.infer<typeof ReservationIdSchema>

export const ReservationStatusFilterSchema = z.object({
    status: z.enum(EnumReservationStatus),
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
  status: z.enum(EnumReservationStatus).optional(),
  from: DateOnHourSchema.optional(),
  to: DateOnHourSchema.optional(),
}).refine((data) => {
  // se entrambi i valori esistono, controlla l'ordine
  if (data.from && data.to) {
    return data.from.getTime() < data.to.getTime();
  }
  // se uno dei due manca, va bene
  return true;
}, {
  message: "La data di inizio deve essere precedente alla fine",
  path: ["from"],
});

export type ReservationOptionalFilterInput = z.infer<typeof ReservationOptionalFilterSchema>


export const NewReservationSchema = z.object({
    calendar_id: StandarIdSchema,
    title: GenericStringSchema,
    start_time: DateOnHourSchema,
    end_time: DateOnHourSchema,
    reason : GenericStringSchema

}).refine((data) => data.start_time.getTime() < data.end_time.getTime(), {
  message: "La data di inizio deve essere precedente alla fine",
  path: ["start"],
}).refine(
  (data) =>{ 
    const currentHour = new Date(Date.now());
    currentHour.setMinutes(0, 0, 0); 

            // DateOnHourSchema transforms ISO strings to Date, but be defensive: support Date or string
            const start = data.start_time instanceof Date ? data.start_time : new Date(data.start_time);
            return start.getTime() >= currentHour.getTime();
},
        { message: "La data di inizio deve essere futura", path: ["start_time"] }
)
export type NewReservationInput = z.infer<typeof NewReservationSchema>


export const UpdateStatusReseservationSchema = z.object({
    id: StandarIdSchema,
    newStatus: z.enum([EnumReservationStatus.Approved,EnumReservationStatus.Reject]),
    reason : GenericStringSchema.optional()

})
export type UpdateStatusReseservationInput = z.infer<typeof UpdateStatusReseservationSchema>


export const CheckSlotSchema = z.object({
  calendar_id: StandarIdSchema,
  start: DateOnHourSchema,
  end: DateOnHourSchema,
}).refine(
  (data) =>
    data.start instanceof Date &&
    data.end instanceof Date &&
    data.start.getTime() < data.end.getTime(),
  {
    message: "La data di inizio deve essere precedente alla fine",
    path: ["start"],
  }
);

export type CheckSlotInput = z.infer<typeof CheckSlotSchema>


