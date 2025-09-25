import { Router } from "express";
import {  verifyToken } from "../middleware/middlewareToken";
import { buildCalendarController,buildReservationController} from "../utils/controllerFactory";
import { validateBodySchema,validateQuerySchema,validateParamsSchema } from "../middleware/middlewareValidator";
import { CheckSlotSchema, ReservationIdSchema, NewReservationSchema, ReservationOptionalFilterSchema, ReservationStatusFilterSchema } from "../middleware/zodValidator/reservation.schema";
import { CalendaIdSchema } from "../middleware/zodValidator/calendar.schema";
import { verifyUserTokens } from "../middleware/middlewareTokenFinish";

const calendar_conytroller = buildCalendarController()

const reservation_controller =buildReservationController()

const router = Router()

/*

Before all routes there is the check of the Token JWT
and the check if the user has enough app token.

Before calling the controller there is the check of the user input
*/

router.post("/reservation",
    verifyToken,
    verifyUserTokens,
    validateBodySchema(NewReservationSchema),
    reservation_controller.newReservation)

router.get("/reservation/state",
    verifyToken,
    verifyUserTokens,
    validateQuerySchema(ReservationStatusFilterSchema),
    reservation_controller.getReservationsFilterStatus)

router.get("/reservation/filter",
    verifyToken,
    verifyUserTokens,
    validateQuerySchema(ReservationOptionalFilterSchema),
    reservation_controller.getReservationsOptionalFiter)

router.get("/calendar",
    verifyToken,
    verifyUserTokens,
    validateQuerySchema(CalendaIdSchema),
    calendar_conytroller.getCalendar)

router.delete("/reservation/:id",
    verifyToken,
    verifyUserTokens,
    validateParamsSchema(ReservationIdSchema),
    reservation_controller.deleteReservations)

router.get("/slot",
    verifyToken,
    verifyUserTokens,
    validateQuerySchema(CheckSlotSchema),
    calendar_conytroller.checkSclot)





export default router;