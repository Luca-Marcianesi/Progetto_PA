import { ReservationController } from "../controllers/reservcol";
import { ReservationService } from "../services/reservationService";
import { ReservationRepository } from "../repository/reservRepository";
import { ReservationDAO } from "../dao/restionDAO";
import { CalendarDAO } from "../dao/calarDAO";
import { CalendarRepository } from "../repository/calenRepository";
import { UserDAO } from "../dao/usDAO";
import { UserRepository } from "../repository/usRepository";
import { CalendarService } from "../services/calendarService";
import { CalendarController } from "../controllers/calcol";
import { ResourceDAO } from "../dao/resceDAO";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/usercol";
import { ResourceRepository } from "../repository/resoeRepository";
import { ResourceController } from "../controllers/resoucol";
import { ResourceService } from "../services/resourceService";

export function buildUserController(){
    const userDao = new UserDAO()
    const userRepository = new UserRepository(userDao)
    const user_service = new UserService(userRepository)
    return new UserController(user_service)

}


export function buildReservationController(){
    const reservationDao = new ReservationDAO()
    const userDao = new UserDAO()
    const calendarDao = new CalendarDAO()
    const calendarRepository = new CalendarRepository(reservationDao,calendarDao)
    const userRepository = new UserRepository(userDao)
    const reservation_reository = new ReservationRepository(reservationDao,calendarDao)
    const reservation_service = new ReservationService(reservation_reository,calendarRepository,userRepository)
    return new ReservationController(reservation_service)

}

export function buildCalendarController(){
    const resourceDao = new ResourceDAO()
    const resourceRepository = new ResourceRepository(resourceDao)
    const calendarDao = new CalendarDAO()
    const reservationDao = new ReservationDAO()
    const calendarRepository = new CalendarRepository(reservationDao,calendarDao)
    const userDao = new UserDAO()
    const userRepository = new UserRepository(userDao)
    const reservation_reository = new ReservationRepository(reservationDao,calendarDao)
    const calendar_service = new CalendarService(calendarRepository,resourceRepository,reservation_reository,userRepository)
    return new CalendarController(calendar_service)
}

export function buildResourceController(){
    const resourceDao = new ResourceDAO()
    const resourceRepository = new ResourceRepository(resourceDao)
    const resourceService = new ResourceService(resourceRepository)
    return new ResourceController(resourceService)
}