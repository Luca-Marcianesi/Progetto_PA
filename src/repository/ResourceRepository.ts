
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

    getResourceById(id: number): Promise<DomainResource | null> {
        throw Error("non implementata")
    }

    getAllResources(): Promise<DomainResource[]> {
        throw Error("non implementata")
    }

}