import { Resource } from "../../models/resourceModel";
import { CreateResourceInput } from "../../middleware/zodValidator/resource.schema";
import { DomainResource } from "../../domain/resource";
export interface IResourceService {
    createResource(input : CreateResourceInput): Promise<DomainResource>;

    getResourceById(id: number): Promise<Resource | null>;

    getAllResources(): Promise<Resource[]>;

    updateResource(id: number, updateData: { name?: string; description?: string | null; }): Promise<void>;
}