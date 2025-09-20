import { Router } from "express";
import {  verifyToken } from "../middleware/middlewareToken";
import { buildCalendarController,buildReservationController,
    buildResourceController,buildUserController } from "../utils/controllerFactory";



const resource_controller = buildResourceController()


const calendar_conytroller = buildCalendarController()

const user_controller = buildUserController()

const reservation_controller =buildReservationController()

const router = Router()

// Verifica del token prima di ogni rotta del file
router.use(verifyToken,)



export default router;