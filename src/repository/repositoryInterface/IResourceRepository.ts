import { DomainResource } from "../../domain/resource";
import { CreateResourceInput } from "../../middleware/zodValidator/resource.schema";
import { Resource } from "../../models/resourceModel";
export interface IResourceRepository {
    createResource(input : CreateResourceInput): Promise<DomainResource>

    getResourceById(id: number): Promise<DomainResource | null> 

}