import { ReservationController } from "../controllers/reservationController";
import { ReservationService } from "../services/reservationService";
import { ReservationRepository } from "../repository/reservationRepository";
import { ReservationDAO } from "../dao/reservationDAO";
import { CalendarDAO } from "../dao/calendarDAO";
import { CalendarRepository } from "../repository/calendarRepository";
import { UserDAO } from "../dao/userDAO";
import { UserRepository } from "../repository/userRepository";
import { CalendarService } from "../services/calendarService";
import { CalendarController } from "../controllers/calendarController";
import { ResourceDAO } from "../dao/resourceDAO";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";
import { ResourceRepository } from "../repository/resourceRepository";
import { ResourceController } from "../controllers/resourceController";
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