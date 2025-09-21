import { Router } from "express";
import {  verifyToken } from "../middleware/middlewareToken";
import { buildCalendarController,buildReservationController} from "../utils/controllerFactory";
import { validateBodySchema,validateQuerySchema,validateParamsSchema } from "../middleware/middlewareValidator";
import { CheckSlotSchema, deleteReservationSchema, NewReservationSchema, ReservationOptionalFilterSchema, ReservationStatusFilterSchema } from "../middleware/zodValidator/reservation.schema";
import { CalendaIdSchema } from "../middleware/zodValidator/calendar.schema";

const calendar_conytroller = buildCalendarController()

const reservation_controller =buildReservationController()

const router = Router()

// Verifica del token prima di ogni rotta del file
router.use(verifyToken)

router.post("/reservation", validateBodySchema(NewReservationSchema),reservation_controller.newReservation)

router.get("/reservation/state",validateBodySchema(ReservationStatusFilterSchema),reservation_controller.getReservations)

router.get("/reservation/filter", validateQuerySchema(ReservationOptionalFilterSchema),reservation_controller.getReservationsFiltered)

router.get("/calendar",validateQuerySchema(CalendaIdSchema),calendar_conytroller.getCalendar)

router.delete("/reservation", validateParamsSchema(deleteReservationSchema),reservation_controller.deleteReservations)

router.get("/slot",validateQuerySchema(CheckSlotSchema),calendar_conytroller.checkSclot)





export default router;