import { IUserDAO } from "../dao/daoInterface/IUserDAO.js";
import { DomainUser } from "../domain/user.js";
import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory.js";
import { User } from "../models/User.js";
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
    if(model !== null) return this.buidUser(model)
    throw ErrorFactory.getError(ErrorType.UserNotFound)
  }

  async addTokenToUser(email: string, token: number): Promise<void> {
    return this.userDAO.addTokenToUser(email, token);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    let model = await this.userDAO.getUserByEmail(email);
    return model
  }
  async getUserToken(user_id: number): Promise<number | null> {
    return this.userDAO.getUserToken(user_id)
      
  }
  async getUserById(id: number): Promise<DomainUser | null> {
    let model = await this.userDAO.getUserById(id)
    if(model !== null) return this.buidUser(model)
    throw ErrorFactory.getError(ErrorType.UserNotFound)
      
  }


  private buidUser(model: User): DomainUser{
    return new DomainUser(
      model.name,
      model.surname,
      model.email,
      model.password
    )
  }

}
