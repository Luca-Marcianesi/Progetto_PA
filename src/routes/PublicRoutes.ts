import { Router } from "express";
import { UserDAO } from "../dao/userDAO.js";
import { UserRepository } from "../repository/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/userController.js";

import {detachToken} from "../middleware/middlewareToken.js";


import { validateBodySchema } from "../middleware/middlewareValidator.js";
import { LoginSchema, RegisterSchema } from "../middleware/zodValidator/user.schema.js";
import {buildUserController } from "../utils/controllerFactory.js";

const user_controller = buildUserController()

const router = Router();


//Rotte non autenticate
router.post("/user", [validateBodySchema(RegisterSchema), user_controller.create]);
router.post("/login", [validateBodySchema(LoginSchema), user_controller.login, detachToken]);


export default router