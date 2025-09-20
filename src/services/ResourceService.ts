import { Resource } from "../models/Resource";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { ResourceRepository } from "../repository/ResourceRepository";
import { IResourceService } from "./serviceInterface/IResourceService";

export class ResourceService implements IResourceService{
    private resource_repository : IResourceRepository

    constructor(resource_repository : IResourceRepository){
        this.resource_repository = resource_repository
    }
    createResource(resourceData: { name: string; description?: string | null; }): Promise<number> {
        throw Error("non Implementata")
        
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