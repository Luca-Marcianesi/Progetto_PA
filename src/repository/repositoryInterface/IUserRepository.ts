import { DomainUser } from "../../domain/user.js";
import { User } from "../../models/userModel.js";
export interface IUserRepository {
    createUser(user: DomainUser): Promise<DomainUser>;
    addTokenToUser(id: number, token: number): Promise<void>;
    getUserByEmail(email: string): Promise<DomainUser | null>;
    getUserToken(userId: number): Promise<number | null>
    getUserById(id: number): Promise<DomainUser | null>;
    

}