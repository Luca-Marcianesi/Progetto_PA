import { DomainUser } from "../../domain/user.js";
import { User } from "../../models/User.js";
export interface IUserRepository {
    createUser(user: DomainUser): Promise<DomainUser>;
    addTokenToUser(id: number, token: number): Promise<void>;
    getUserByEmail(email: string): Promise<DomainUser | null>;
    getUserToken(user_id: number): Promise<number | null>
    getUserById(id: number): Promise<DomainUser | null>;
    

}