import { Router } from "express";
import { UserDAO } from "../dao/UserDAO.js";
import { UserRepository } from "../repository/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";

import {checkInputLogin,detachToken, verifyToken, validateNewUser} from "../middleware/middleware.js";
const router = Router();

// wiring manuale delle dipendenze

const dao = new UserDAO();
const repo = new UserRepository(dao);
const service = new UserService(repo);
const controller = new UserController(service);

router.post("/user", controller.create);
router.get("/user/:email", controller.getUserByEmail);
router.put("/user/:email/token", controller.updateToken);
router.get("/auth",[verifyToken,controller.auth])
router.post("/login", [checkInputLogin, controller.login, detachToken]);

export default router;



