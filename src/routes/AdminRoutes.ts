import { Router } from "express";
import { authenticate, verifyToken } from "../middleware/middlewareToken";
import { ADMIN_ROLE } from "../utils/db_const";
import { buildCalendarController,buildReservationController,
    buildResourceController,buildUserController } from "../utils/controllerFactory";
import { validateBodySchema,validateParamsSchema,validateQuerySchema } from "../middleware/middlewareValidator";
import { UpdateTokenSchema } from "../middleware/zodValidator/user.schema";
import { CreateResourceSchema } from "../middleware/zodValidator/resource.schema";
import { CalendaIdSchema, CreateCalendarSchema, UpdateCalendaCostSchema, UpdateCalendarEndSchema } from "../middleware/zodValidator/calendar.schema";
import { UpdateStatusReseservationSchema } from "../middleware/zodValidator/reservation.schema";
import { ResourceDAO } from "../dao/ResourceDAO";



const resource_controller = buildResourceController()


const calendar_controller = buildCalendarController()

const user_controller = buildUserController()

const reservation_controller =buildReservationController()

const router = Router()

// Verifica del token e controllo del ruolo nel  payload del token prima di ogni rotta
router.use(verifyToken,authenticate([ADMIN_ROLE]))

//Utente
router.patch("/user/:email/token",validateBodySchema(UpdateTokenSchema), user_controller.updateToken);

//Risorse
router.post("/resource",validateBodySchema(CreateResourceSchema),resource_controller.createResource);

//Calendario
router.post("/calendar",validateBodySchema(CreateCalendarSchema),calendar_controller.createCalendar);

router.patch("/calendar/archive",validateBodySchema(CalendaIdSchema),calendar_controller.archiveCalendar)

router.get("/calendar",validateQuerySchema(CalendaIdSchema),calendar_controller.getCalendar);

router.patch("/calendar/cost", validateBodySchema(UpdateCalendaCostSchema),calendar_controller.updateCalendarCost);

router.patch("/calendar/end",validateBodySchema(UpdateCalendarEndSchema),calendar_controller.updateCalendaEnd);

router.delete("/calendar", validateParamsSchema(CalendaIdSchema), calendar_controller.cancelCalendar)

//Prenotazioni

router.patch("/reservation",validateBodySchema(UpdateStatusReseservationSchema),reservation_controller.updateReservations)

router.get("/reservationsByCal",validateQuerySchema(CalendaIdSchema),reservation_controller.getReservationsByCal)




router.get("/test",calendar_controller.test)



export default router
