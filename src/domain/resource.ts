import { rmSync } from "fs"
import { Resource } from "../models/Resource"

interface ResourceInput{
    id: number,
    name: string

}

export class DomainResource{
    public id: number
    public name: string
    constructor(resource: ResourceInput){
        this.id = resource.id,
        this.name = resource.name
    }

    static fromPersistence(resource: Resource){
        return new DomainResource({
            id: resource.id,
            name: resource.name
        }
        )
    }
    
}