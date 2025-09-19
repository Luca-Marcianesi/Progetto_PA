import {z} from "zod";

export const createReservationSchema = z.object({
    calendarId: z.number().int().positive(),
    userId: z.number().int().positive(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    title: z.string().min(3),

})

export type CreateReservationDTO = z.infer<typeof createReservationSchema>;