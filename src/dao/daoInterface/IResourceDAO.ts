import { Resource } from "../../models/Resource";

export interface IResourceDAO {
    createResource(resourceData: { name: string; description?: string | null; }): Promise<number>;
    getResourceById(id: number): Promise<Resource | null>;
    getAllResources(): Promise<Resource[]>;
    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void>;
}