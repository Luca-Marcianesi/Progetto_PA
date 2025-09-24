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



const resource_controller = buildResourceController()


const calendar_controller = buildCalendarController()

const user_controller = buildUserController()

const reservation_controller =buildReservationController()

const router = Router()



//Utente
router.patch("/user/:email/token",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateBodySchema(UpdateTokenSchema),
    user_controller.updateToken);

//Risorse
router.post("/resource",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateBodySchema(CreateResourceSchema),
    resource_controller.createResource);

//Calendario
router.post("/calendar",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(CreateCalendarSchema),
    calendar_controller.createCalendar);

router.patch("/calendar/unarchive",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(CalendaIdSchema),
    calendar_controller.archiveCalendar)

router.get("/calendar",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateQuerySchema(CalendaIdSchema),
    calendar_controller.getCalendar);

router.patch("/calendar/cost",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(UpdateCalendaCostSchema),
    calendar_controller.updateCalendarCost);

router.patch("/calendar/end",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(UpdateCalendarEndSchema),
    calendar_controller.updateCalendaEnd);

router.delete("/calendar/:calendar_id",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateParamsSchema(CalendaIdSchema),
    calendar_controller.cancelCalendar)

//Prenotazioni

router.patch("/reservation",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateBodySchema(UpdateStatusReseservationSchema),
    reservation_controller.updateReservations)

router.get("/reservationsByCal",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateQuerySchema(CalendaIdSchema),
    reservation_controller.getReservationsByCal)




router.get("/test",calendar_controller.test)



export default router
