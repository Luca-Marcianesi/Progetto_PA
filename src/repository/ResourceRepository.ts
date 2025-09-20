
import { IResourceDAO } from "../dao/daoInterface/IResourceDAO";
import { Resource } from "../models/Resource";
import { IResourceRepository } from "./repositoryInterface/IResourceRepository";

export class ResourceRepository implements IResourceRepository{
    private resource_dao: IResourceDAO

    constructor(resource_dao: IResourceDAO){
        this.resource_dao = resource_dao

    }
    createResource(resourceData: { name: string; description?: string | null; }): Promise<number> {
        throw Error("non implementata")
    }

    getResourceById(id: number): Promise<Resource | null> {
        throw Error("non implementata")
    }

    getAllResources(): Promise<Resource[]> {
        throw Error("non implementata")
    }

    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void> {
        throw Error("non implementata")
    }
}