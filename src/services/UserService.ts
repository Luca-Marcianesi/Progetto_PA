import { IUserRepository } from "../repository/repositoryInterface/IUserRepository.js";
import { IUserService } from "./serviceInterface/IUserService.js";
import { User } from "../models/User.js";
import { createHash } from "crypto";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory.js";
import { get } from "http";
import { DomainUser } from "../domain/user.js";
import { RegisterInput } from "../middleware/zodValidator/user.schema.js";

const HASH_ALGORITM = "sha256";
const DIGEST = "hex" // You can change this to your preferred hashing algorithm

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(userInput: RegisterInput): Promise<DomainUser> {
    if(await this.userRepo.getUserByEmail(userInput.email) !== null){
      throw ErrorFactory.getError(ErrorType.EmailUsed);
    }
    userInput.password = createHash(HASH_ALGORITM).update(userInput.password).digest(DIGEST);// hash della password

    let user_validated = new DomainUser(
      userInput.name,
      userInput.surname,
      userInput.email,
      userInput.password
    )
    return await this.userRepo.createUser(user_validated);
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

  async login(email: string, password: string): Promise<User | never> {
      let password_hash = createHash(HASH_ALGORITM).update(password).digest(DIGEST);
      let user  = await this.userRepo.getUserByEmail(email);
      if(user === null || user.password != password_hash){
        throw ErrorFactory.getError(ErrorType.LoginFail)
      }
      return user
  }



  
}
