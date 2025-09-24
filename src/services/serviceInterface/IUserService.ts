import { DomainUser } from "../../domain/user.js";
import { User } from "../../models/userModel.js";
export interface IUserService {
  login(email: string, password: string): Promise<DomainUser>;
  createUser(userData: { name: string; surname: string; email: string; password: string; }): Promise<DomainUser>;
  addTokenToUser(email: string, token: number): Promise<void>;
  getUserByEmail(email: string): Promise<DomainUser | null>;
}

 
