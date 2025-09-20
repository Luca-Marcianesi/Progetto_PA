import {z} from "zod"
import { GenericStringSchema, StandarIdSchema } from "./utilsValidator"

export const ResourceIdSchema = z.object({
    resource_id: StandarIdSchema
})

export type ResourceIdInput = z.infer<typeof ResourceIdSchema>


export const CreateResourceSchema = z.object({
    name: GenericStringSchema,
    description: GenericStringSchema

})

export type CreateResourceInput = z.infer<typeof CreateResourceSchema>
