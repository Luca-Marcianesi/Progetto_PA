import { Resource } from "../models/Resource";
import { IResourceDAO } from "./daoInterface/IResourceDAO";
export class ResourceDAO implements IResourceDAO {

    async createResource(name: string, description: string): Promise<Resource> {
        return await Resource.create({
            name: name,
            description : description

        }

        );
        
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