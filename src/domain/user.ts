import { enumRole } from "../utils/db_const";

export class DomainUser{
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public psw: string,
        public id?: number,
        public role?: enumRole,
        
    ){ }

}
