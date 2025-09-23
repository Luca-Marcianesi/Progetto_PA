
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { DomainResource } from "../domain/resource";
import { Resource } from "../models/Resource";
import { IResourceRepository } from "./repositoryInterface/IResourceRepository";

export class ResourceRepository implements IResourceRepository{
    private resource_dao: IResourceDAO

    constructor(resource_dao: IResourceDAO){
        this.resource_dao = resource_dao

    }
    createResource(resourceData: { name: string; description?: string | null; }): Promise<DomainResource> {
        throw Error("non implementata")
    }

    async getResourceById(id: number): Promise<DomainResource | null> {
        let model = await this.resource_dao.getResourceById(id)
        if(model === null) return null
        return new DomainResource(
            model.name,
            model.id
        )
    }

    getAllResources(): Promise<DomainResource[]> {
        throw Error("non implementata")
    }

}