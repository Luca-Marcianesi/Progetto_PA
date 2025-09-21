import { DomainResource } from "../../domain/resource";
import { Resource } from "../../models/Resource";
export interface IResourceRepository {
    createResource(resourceData: { name: string; description?: string | null; }): Promise<DomainResource>

    getResourceById(id: number): Promise<DomainResource | null> 

    getAllResources(): Promise<DomainResource[]>


}