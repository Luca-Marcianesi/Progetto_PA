import { Router } from "express";
import { UserDAO } from "../dao/UserDAO.js";
import { UserRepository } from "../repository/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";

import {checkInputLogin,detachToken, verifyToken, validateNewUser} from "../middleware/middleware.js";
import { ResourceDAO } from "../dao/ResourceDAO.js";
import { CalendarRepository } from "../repository/CalendarRepository.js";
import { CalendarService } from "../services/CalendarService.js";
import { CalendarController } from "../controllers/CalendarController.js";
const router = Router();

// wiring manuale delle dipendenze

const dao = new UserDAO();
const repo = new UserRepository(dao);
const service = new UserService(repo);
const controller = new UserController(service);

const resource_dao = new ResourceDAO();
const cal_repo = new CalendarRepository(resource_dao)
const cal_service = new CalendarService(cal_repo);
const cal_controller = new CalendarController(cal_service);

router.post("/user", controller.create);
router.get("/user/:email", controller.getUserByEmail);
router.put("/user/:email/token", controller.updateToken);
router.get("/auth",[verifyToken,controller.auth])
router.post("/login", [checkInputLogin, controller.login, detachToken]);

router.post("/resource",cal_controller.createResource);

router.get("/resource/:id",cal_controller.getResourceById)
router.get("/resources",cal_controller.getAllResources)

export default router;



