import { ErrorFactory, ErrorType } from "../middleware/errors/ErrorFactory";

// Reservation model (può essere Sequelize o un domain model)
export  interface ReservationDataInterface {
  calendar_id: number;
  user_id: number;
  title: string;
  start_time: Date;
  end_time: Date;
  status: string;

}