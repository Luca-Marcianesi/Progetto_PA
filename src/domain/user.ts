import { User } from "../models/User";
import { enumRole } from "../utils/db_const";

interface userInput{
    id: number
    name: string
    surname: string
    email: string
    psw: string
    role: enumRole

}
export class DomainUser{
    public id: number
    public name: string
    public surname: string
    public email: string
    public psw: string
    public role: enumRole

    constructor(user : userInput){
        this.id = user.id
        this.name = user.name
        this.surname = user.surname
        this.email = user.email
        this.psw = user.psw
        this.role = user.role
     }

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
            case enumRole.ADMIN: return enumRole.ADMIN
            default: return enumRole.USER

        }
    }

}
