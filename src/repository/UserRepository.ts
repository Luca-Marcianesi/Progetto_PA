import { IUserDAO } from "../dao/daoInterface/IUserDAO.js";
import { DomainUser } from "../domain/user.js";
import { ErrorFactory, ErrorType } from "../middleware/errors/errorFactory.js";
import { User } from "../models/userModel.js";
import { IUserRepository } from "./repositoryInterface/IUserRepository.js";

export class UserRepository implements IUserRepository {
  constructor(private userDAO: IUserDAO) {}

  async createUser(user: DomainUser): Promise<DomainUser> {
    let model = await this.userDAO.createUser(
      user.name,
      user.surname,
      user.email,
      user.psw
    );
    if(model !== null) return DomainUser.fromPersisence(model)
    throw ErrorFactory.getError(ErrorType.UserNotFound)
  }

  async addTokenToUser(id: number, token: number): Promise<void> {
    return this.userDAO.addTokenToUser(id, token);
  }

  async getUserByEmail(email: string): Promise<DomainUser | null> {
    let model = await this.userDAO.getUserByEmail(email);
    return model === null ? null : DomainUser.fromPersisence(model)
  }

  async getUserToken(user_id: number): Promise<number | null> {
    return this.userDAO.getUserToken(user_id)
      
  }

  async getUserById(id: number): Promise<DomainUser | null> {
    let model = await this.userDAO.getUserById(id)
    if(model !== null) return DomainUser.fromPersisence(model)
    throw ErrorFactory.getError(ErrorType.UserNotFound)
  }


}
