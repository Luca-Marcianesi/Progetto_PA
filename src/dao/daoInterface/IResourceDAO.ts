import { Resource } from "../../models/Resource";

export interface IResourceDAO {
    createResource( name: string, description?: string): Promise<Resource>;
    getResourceById(id: number): Promise<Resource | null>;
    getAllResources(): Promise<Resource[]>;
    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void>;
}