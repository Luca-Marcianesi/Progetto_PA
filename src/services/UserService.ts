import { IUserRepository } from "../repository/repositoryInterface/IUserRepository.js";
import { IUserService } from "./serviceInterface/IUserService.js";
import { User } from "../models/User.js";
import { createHash } from "crypto";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory.js";
import { get } from "http";

const HASH_ALGORITM = "sha256";
const DIGEST = "hex" // You can change this to your preferred hashing algorithm

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(userData: {
    name: string; 
    surname: string; 
    email: string; 
    password: string; 
  }): Promise<number> {
    if(await this.userRepo.getUserByEmail(userData.email) !== null){
      throw ErrorFactory.getError(ErrorType.EmailUsed);
    }
    userData.password = createHash(HASH_ALGORITM).update(userData.password).digest(DIGEST); // Here you would hash the password
    return await this.userRepo.createUser(userData);
  }
  async   addTokenToUser(email: string, token: number): Promise<void> {
    return await this.userRepo.addTokenToUser(email, token);
  }
  async  getUserByEmail(email: string): Promise<User | never> {
    let user =  await this.userRepo.getUserByEmail(email)
    if (user=== null) {
      throw ErrorFactory.getError(ErrorType.UserNotFound);
    }
    return user;
  }



  
}
