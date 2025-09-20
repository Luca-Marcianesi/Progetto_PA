import { Router } from "express";
import { authenticate, verifyToken } from "../middleware/middlewareToken";
import { ADMIN_ROLE } from "../utils/db_const";
import { buildCalendarController,buildReservationController,
    buildResourceController,buildUserController } from "../utils/controllerFactory";



const resource_controller = buildResourceController()


const calendar_conytroller = buildCalendarController()

const user_controller = buildUserController()

const reservation_controller =buildReservationController()

const router = Router()

// Verifica del token e controllo del ruolo nel  payload del token prima di ogni rotta
router.use(verifyToken,authenticate([ADMIN_ROLE]))

//Utente
router.put("/user/:email/token", user_controller.updateToken);

//Risorse
router.post("/resource",resource_controller.createResource);

//Calendario
router.post("/calendar",calendar_conytroller.createCalendar);

//Prenotazioni



export default router
