import { User } from "../models/userModel";
import { EnumRole } from "../utils/db_const";

interface userInput{
    id: number
    name: string
    surname: string
    email: string
    psw: string
    role: EnumRole

}
export class DomainUser{
    public id: number
    public name: string
    public surname: string
    public email: string
    public psw: string
    public role: EnumRole

    constructor(user : userInput){
        this.id = user.id
        this.name = user.name
        this.surname = user.surname
        this.email = user.email
        this.psw = user.psw
        this.role = user.role
     }

    // Adapter from the Sequelize Model to the Domain Model
    static fromPersisence(user: User){
        return new DomainUser({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            psw: user.password,
            role: DomainUser.mapRole(user.role)
        })

    
    }
    
    static mapRole(role: string){
        switch(role){
            case EnumRole.ADMIN: return EnumRole.ADMIN
            default: return EnumRole.USER

        }
    }

}
