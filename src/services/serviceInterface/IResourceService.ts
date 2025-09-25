import { Resource } from "../../models/resourceModel";
import { CreateResourceInput } from "../../middleware/zodValidator/resource.schema";
import { DomainResource } from "../../domain/resource";
export interface IResourceService {
    createResource(input : CreateResourceInput): Promise<DomainResource>;
}