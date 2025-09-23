import { ReservationController } from "../controllers/ReservationController";
import { ReservationService } from "../services/ReservationService";
import { ReservationRepository } from "../repository/ReservationRepository";
import { ReservationDAO } from "../dao/ReservationDAO";
import { CalendarDAO } from "../dao/CalendarDAO";
import { CalendarRepository } from "../repository/CalendarRepository";
import { UserDAO } from "../dao/UserDAO";
import { UserRepository } from "../repository/UserRepository";
import { CalendarService } from "../services/CalendarService";
import { CalendarController } from "../controllers/CalendarController";
import { ResourceDAO } from "../dao/ResourceDAO";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { ResourceRepository } from "../repository/ResourceRepository";
import { ResourceController } from "../controllers/ResourceController";
import { ResourceService } from "../services/ResourceService";

export function buildUserController(){
    const user_dao = new UserDAO()
    const user_repository = new UserRepository(user_dao)
    const user_service = new UserService(user_repository)
    return new UserController(user_service)

}


export function buildReservationController(){
    const resource_dao = new ResourceDAO()
    const reservation_dao = new ReservationDAO()
    const user_dao = new UserDAO()
    const calendar_dao = new CalendarDAO()
    const calendar_repository = new CalendarRepository(reservation_dao,calendar_dao)
    const user_repository = new UserRepository(user_dao)
    const reservation_reository = new ReservationRepository(reservation_dao,calendar_dao)
    const reservation_service = new ReservationService(reservation_reository,calendar_repository,user_repository)
    return new ReservationController(reservation_service)

}

export function buildCalendarController(){
    const resource_dao = new ResourceDAO()
    const resource_repository = new ResourceRepository(resource_dao)
    const calendar_dao = new CalendarDAO()
    const reservation_dao = new ReservationDAO()
    const calendar_repository = new CalendarRepository(reservation_dao,calendar_dao)
    const user_dao = new UserDAO()
    const user_repository = new UserRepository(user_dao)
    const reservation_reository = new ReservationRepository(reservation_dao,calendar_dao)
    const calendar_service = new CalendarService(calendar_repository,resource_repository,reservation_reository,user_repository)
    return new CalendarController(calendar_service)
}

export function buildResourceController(){
    const resource_dao = new ResourceDAO()
    const resource_repository = new ResourceRepository(resource_dao)
    const resource_service = new ResourceService(resource_repository)
    return new ResourceController(resource_service)
}