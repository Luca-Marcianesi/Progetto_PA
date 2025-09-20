import {z} from "zod"
import { GenericStringSchema, PasswordSchema, StandarIdSchema } from "./utilsValidator"

export const RegisterSchema = z.object({
    name: GenericStringSchema,
    surname: GenericStringSchema,
    email: z.email(),
    password: PasswordSchema

})

export type RegisterInput = z.infer<typeof RegisterSchema>


export const LoginSchema = z.object({
    email: z.email(),
    password: GenericStringSchema

})

export type LoginInput = z.infer<typeof LoginSchema>



export const UpdateTokenSchema = z.object({
    user_id: StandarIdSchema,
    token: z.number().int().positive()

})

export type UpdateTokenInput = z.infer<typeof UpdateTokenSchema>