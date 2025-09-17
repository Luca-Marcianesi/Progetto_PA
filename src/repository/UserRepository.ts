import { IUserDAO } from "../dao/daoInterface/IUserDAO.js";
import { User } from "../models/User.js";
import { IUserRepository } from "./repositoryInterface/IUserRepository.js";

export class UserRepository implements IUserRepository {
  constructor(private userDAO: IUserDAO) {}

  async createUser(userData: {
    name: string; 
    surname: string; 
    email: string; 
    password: string; 
  }): Promise<number> {
    return this.userDAO.createUser(userData);
  }

  async addTokenToUser(email: string, token: number): Promise<void> {
    return this.userDAO.addTokenToUser(email, token);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userDAO.getUserByEmail(email);
  }

}
