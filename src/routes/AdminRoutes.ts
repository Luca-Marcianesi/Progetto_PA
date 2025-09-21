import { Router } from "express";
import { authenticate, verifyToken } from "../middleware/middlewareToken";
import { ADMIN_ROLE } from "../utils/db_const";
import { buildCalendarController,buildReservationController,
    buildResourceController,buildUserController } from "../utils/controllerFactory";



const resource_controller = buildResourceController()


const calendar_controller = buildCalendarController()

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
router.post("/calendar",calendar_controller.createCalendar);

router.get("/calendar",calendar_controller.getCalendar);

router.put("/calendar/cost",calendar_controller.udateCalendarCost);

router.put("/calendar/end",calendar_controller.updateCalendaEnd);

router.delete("/calendar", calendar_controller.cancelCalendar)

//Prenotazioni

router.put("/reservation",reservation_controller.updateReservations)

router.get("/reservationByCal",reservation_controller.getReservationsByCal)



export default router
