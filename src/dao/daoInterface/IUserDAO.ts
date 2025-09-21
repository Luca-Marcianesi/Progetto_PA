import { User } from "../../models/User.js";
export interface IUserDAO {
    createUser(name: string, surname: string, email: string, password: string): Promise<User>;
    addTokenToUser(email: string, token: number): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: number): Promise<User | null>
    getUserToken(id: number): Promise<number | null>

}