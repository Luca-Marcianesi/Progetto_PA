import { User } from "../../models/User.js";
export interface IUserRepository {
    createUser(userData: { name: string; surname: string; email: string; password: string; }): Promise<number>;
    addTokenToUser(email: string, token: number): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserToken(user_id: number): Promise<number | null>
    getUserById(id: number): Promise<User | null>;
    

}