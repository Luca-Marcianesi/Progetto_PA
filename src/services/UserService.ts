import { IUserRepository } from "../repository/repositoryInterface/IUserRepository.js";
import { IUserService } from "./serviceInterface/IUserService.js";
import { User } from "../models/userModel.js";
import { createHash } from "crypto";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory.js";
import { get } from "http";
import { DomainUser } from "../domain/user.js";
import { RegisterInput } from "../middleware/zodValidator/user.schema.js";
import { email } from "zod";
import { enumRole } from "../utils/db_const.js";

const HASH_ALGORITM = "sha256";
const DIGEST = "hex" // You can change this to your preferred hashing algorithm

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(userInput: RegisterInput): Promise<DomainUser> {
    if(await this.userRepo.getUserByEmail(userInput.email) !== null){
      throw ErrorFactory.getError(ErrorType.EmailUsed);
    }
    let hash_password = createHash(HASH_ALGORITM).update(userInput.password).digest(DIGEST);// hash della password

    let user_validated = new DomainUser({
      id: 1,
      name: userInput.name,
      surname: userInput.surname,
      email: userInput.email,
      psw: hash_password,
      role: enumRole.USER
    }
    )
    return await this.userRepo.createUser(user_validated);
  }
  async   addTokenToUser(email: string, token: number): Promise<void> {
    let user = await this.getUserByEmail(email)
    if(user === null) throw ErrorFactory.getError(ErrorType.UserNotFound)
    return await this.userRepo.addTokenToUser(user.id, token);
  }
  async  getUserByEmail(email: string): Promise<DomainUser | never> {
    let user =  await this.userRepo.getUserByEmail(email)
    if (user=== null) {
      throw ErrorFactory.getError(ErrorType.UserNotFound);
    }
    return user;
  }

  async login(email: string, password: string): Promise<DomainUser | never> {
      let password_hash = createHash(HASH_ALGORITM).update(password).digest(DIGEST);
      let user  = await this.userRepo.getUserByEmail(email);
      if(user === null || user.psw != password_hash){
        throw ErrorFactory.getError(ErrorType.LoginFail)
      }
      return user
  }



  
}
