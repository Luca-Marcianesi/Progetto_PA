import { Router } from "express";
import { UserDAO } from "../dao/usDAO.js";
import { UserRepository } from "../repository/usRepository.js";
import { UserService } from "../services/userService.js";
import { UserController } from "../controllers/usercol.js";

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