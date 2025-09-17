import { Resource } from "../models/Resource";
import { IResourceDAO } from "./daoInterface/IResourceDAO";
export class ResourceDAO implements IResourceDAO {

    async createResource(resourceData: { name: string; description?: string | null; }): Promise<number> {
        const resource = await Resource.create(resourceData);
        return resource.id;
    }
    async getResourceById(id: number): Promise<Resource | null> {
        return await Resource.findByPk(id);
    }
    async getAllResources(): Promise<Resource[]> {
        return await Resource.findAll();
    }
    async updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void> {
        await Resource.update(updateData, { where: { id } });
    }
}