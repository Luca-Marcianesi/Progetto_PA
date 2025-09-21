export class DomainCalendar{
    constructor(
        public resource_id: number,
        public start_time: Date,
        public end_time: Date,
        public cost: number,
        public title: string,
        public archive: boolean = false,
        public id?: number,
    ){ }

}
