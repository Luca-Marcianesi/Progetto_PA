import { DomainUser } from "../../domain/user.js";
import { User } from "../../models/User.js";
export interface IUserService {
  login(email: string, password: string): Promise<User>;
  createUser(userData: { name: string; surname: string; email: string; password: string; }): Promise<DomainUser>;
  addTokenToUser(email: string, token: number): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
}

 
