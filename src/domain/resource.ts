import { rmSync } from "fs"
import { Resource } from "../models/resourceModel"

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

    // Adapter from the Sequelize Model to the Domain Model
    static fromPersistence(resource: Resource){
        return new DomainResource({
            id: resource.id,
            name: resource.name
        }
        )
    }
    
}