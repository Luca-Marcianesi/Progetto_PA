import { Calendar } from "../models/Calendar";
import { ICalendarDAO } from "./daoInterface/ICalendarDAO";
import { Op } from "sequelize";

export class CalendarDAO implements ICalendarDAO{

    async getCalendarById(calendar_id: number): Promise<Calendar | null> {
        return await Calendar.findByPk(calendar_id) 
    }

    async findConflicting(id_res: number, start: Date, end: Date): Promise<Calendar[]> {
    return Calendar.findAll({
      where: {
        resource_id: id_res,
        start_time: { [Op.lt]: end }, // inizio esistente < fine nuova
        end_time: { [Op.gt]: start }, // fine esistente > inizio nuova
      },
    });
  }

    async create(resourceId: number, start_time: Date, end_time: Date, cost_per_hour: number,title: string): Promise<Calendar> {
        return await Calendar.create({
          resource_id : resourceId,
          start_time: start_time,
          end_time: end_time,
          cost_per_hour: cost_per_hour,
          title : title

        } )
    }

  }
