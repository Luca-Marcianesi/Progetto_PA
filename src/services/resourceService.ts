import { DomainResource } from "../domain/resource";
import { CreateResourceInput } from "../middleware/zodValidator/resource.schema";
import { Resource } from "../models/resourceModel";
import { IReservationRepository } from "../repository/repositoryInterface/IResevationRepository";
import { IResourceRepository } from "../repository/repositoryInterface/IResourceRepository";
import { ResourceRepository } from "../repository/resoeRepository";
import { IResourceService } from "./serviceInterface/IResourceService";

export class ResourceService implements IResourceService{
    private resourceRepository : IResourceRepository

    constructor(resourceRepository : IResourceRepository){
        this.resourceRepository = resourceRepository
    }
    async createResource(input: CreateResourceInput): Promise<DomainResource> {
        return await this.resourceRepository.createResource(input)
        
    }


}
