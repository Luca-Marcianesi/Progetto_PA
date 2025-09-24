import { DomainResource } from "../../domain/resource";
import { CreateResourceInput } from "../../middleware/zodValidator/resource.schema";
import { Resource } from "../../models/Resource";
export interface IResourceRepository {
    createResource(input : CreateResourceInput): Promise<DomainResource>

    getResourceById(id: number): Promise<DomainResource | null> 

    getAllResources(): Promise<DomainResource[]>


}