import { User } from "../models/User.js";
import { IUserDAO } from "./daoInterface/IUserDAO.js";
export class UserDAO implements IUserDAO {

    async createUser(
        name: string,
        surname: string,
        email: string,
        password: string,
    ): Promise<User> {
        return await User.create({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
        

    }

    async addTokenToUser(id: number, token: number): Promise<void> {
        await User.increment({ token }, { where: { id: id } });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id)
    }
    
    async getUserToken(id: number): Promise<number | null> {
        const user =  await User.findByPk(id)
        return user ? user.token:  null
    }
}