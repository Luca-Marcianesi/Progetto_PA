import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {CreateCalendarSchema} from "../src/middleware/zodValidator/calendar.schema"
import {validateBodySchema} from "../src/middleware/middlewareValidator"

describe("Test CreateCalendarSchema", () =>{
    let req: Partial<Request>
    let res: Partial<Response>
    let next: NextFunction

    beforeEach(() =>{
        req = {}
        res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        next= jest.fn()
    })

    const middleware = validateBodySchema(CreateCalendarSchema)

    it("Dovrebbe chiamare next", async () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    // make sure start is in the future for the schema refine
    now.setHours(now.getHours() + 1);
    const later = new Date(now);
    later.setHours(now.getHours() + 1);

        req.body = {
            resource_id: 123,
            cost_per_hour: 50,
            start: now.toISOString(),  // ISO string
            end: later.toISOString(),  // ISO string
            title: "Prova calendario",
        };

        await middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        });

    it("Dovrebbe restituire 400 start passato", () =>{
        const past = new Date();
        past.setHours(past.getHours() - 1);
        past.setMinutes(0, 0, 0);
        const later = new Date();
        later.setHours(later.getHours() + 1);

    req.body = {
    resource_id: "123abc",
    cost_per_hour: 50,
    start: past.toISOString(),
    end: later.toISOString(),
    title: "Prova calendario",
    };

        middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(next).not.toHaveBeenCalled();

    })

    it("Dovrebbe rispondere 400 perchè la fine è prima dell'inizio", () => {
        const now = new Date();
        now.setMinutes(0, 0, 0);
        const endBefore = new Date(now);
        endBefore.setHours(now.getHours() - 1);

    req.body = {
    resource_id: "123abc",
    cost_per_hour: 50,
    start: now.toISOString(),
    end: endBefore.toISOString(),
    title: "Prova calendario",
    };

        middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(next).not.toHaveBeenCalled();
    });

    it("Dovrebbe rispondere 400 perchè il costo è negativo", () => {
        const now = new Date();
        now.setMinutes(0, 0, 0);
        const later = new Date(now);
        later.setHours(now.getHours() + 1);

    req.body = {
    resource_id: "123abc",
    cost_per_hour: -10,
    start: now.toISOString(),
    end: later.toISOString(),
    title: "Prova calendario",
    };

        middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(next).not.toHaveBeenCalled();
    });

}
)