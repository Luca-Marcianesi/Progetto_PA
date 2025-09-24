import { DomainResource } from "../domain/resource";
import { CreateResourceInput } from "../middleware/zodValidator/resource.schema";
import { Resource } from "../models/resourceModel";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { ResourceRepository } from "../repository/resourceRepository";
import { IResourceService } from "./serviceInterface/IResourceService";

export class ResourceService implements IResourceService{
    private resource_repository : IResourceRepository

    constructor(resource_repository : IResourceRepository){
        this.resource_repository = resource_repository
    }
    async createResource(input: CreateResourceInput): Promise<DomainResource> {
        return await this.resource_repository.createResource(input)
        
    }

    getAllResources(): Promise<Resource[]> {
        throw Error("non Implementata")
        
    }

    getResourceById(id: number): Promise<Resource | null> {
        throw Error("non Implementata")
        
    }

    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void> {
        throw Error("non Implementata")
        
    }

}