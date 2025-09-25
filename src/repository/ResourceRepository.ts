
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { DomainResource } from "../domain/resource";
import { CreateResourceInput } from "../middleware/zodValidator/resource.schema";
import { Resource } from "../models/resourceModel";
import { IResourceRepository } from "./repositoryInterface/IResourceRepository";

export class ResourceRepository implements IResourceRepository{
    private resource_dao: IResourceDAO

    constructor(resource_dao: IResourceDAO){
        this.resource_dao = resource_dao

    }
    async createResource(input: CreateResourceInput): Promise<DomainResource> {
        let model = await this.resource_dao.createResource(input.name, input.description)
        return DomainResource.fromPersistence(model)
    }

    async getResourceById(id: number): Promise<DomainResource | null> {
        let model = await this.resource_dao.getResourceById(id)
        if(model === null) return null
        return  DomainResource.fromPersistence(model)
    }


}