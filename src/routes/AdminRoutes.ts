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

/*

Before all routes there is the check ok the Token
ande the check ok the role of the request sender

Before calling the controller there is the check of the user input
*/



//User
router.patch("/token",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateQuerySchema(UpdateTokenSchema),
    user_controller.updateToken);

//Resource
router.post("/resource",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateBodySchema(CreateResourceSchema),
    resource_controller.createResource);

//Calendar
router.post("/calendar",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(CreateCalendarSchema),
    calendar_controller.createCalendar);

router.patch("/calendar/unarchive",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(CalendaIdSchema),
    calendar_controller.unarchiveCalendar)

router.get("/calendar",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateQuerySchema(CalendaIdSchema),
    calendar_controller.getCalendar);


router.patch("/calendar/end",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateBodySchema(UpdateCalendarEndSchema),
    calendar_controller.updateEndCalendar);

router.delete("/calendar/:calendarId",
    verifyToken,authenticate([ADMIN_ROLE]),
    validateParamsSchema(CalendaIdSchema),
    calendar_controller.cancelCalendar)

//Reservations

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
