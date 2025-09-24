import { Request, Response, NextFunction } from "express";
import { NewReservationSchema } from "../src/middleware/zodValidator/reservation.schema";
import { validateBodySchema } from "../src/middleware/middlewareValidator";

describe("Test NewReservationSchema Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  const middleware = validateBodySchema(NewReservationSchema);

  it("Dovrebbe chiamare next con dati validi", async () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    // make start in the future
    now.setHours(now.getHours() + 1);
    const later = new Date(now);
    later.setHours(later.getHours() + 1);

    req.body = {
      calendar_id: 123,
      title: "Titolo prova",
      start_time: now.toISOString(),
      end_time: later.toISOString(),
      reason: "Motivo prova",
    };

    await middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("Dovrebbe fallire se start_time nel passato", async () => {
    const past = new Date();
    past.setMinutes(0, 0, 0);
    past.setHours(past.getHours() - 1);
    const later = new Date();
    later.setMinutes(0, 0, 0);
    later.setHours(later.getHours() + 1);

    req.body = {
      calendar_id: 123,
      title: "Titolo prova",
      start_time: past.toISOString(),
      end_time: later.toISOString(),
      reason: "Motivo prova",
    };

    await middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ errors: expect.any(Array) })
    );
  });

  it("Dovrebbe fallire se end_time prima di start_time", async () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    const before = new Date(now);
    before.setHours(now.getHours() - 1);

    req.body = {
      calendar_id: 123,
      title: "Titolo prova",
      start_time: now.toISOString(),
      end_time: before.toISOString(),
      reason: "Motivo prova",
    };

    await middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ errors: expect.any(Array) })
    );
  });

  it("Dovrebbe fallire se costi o altri campi non validi", async () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);
    const later = new Date(now);
    later.setHours(later.getHours() + 1);

    req.body = {
      calendar_id: 123,
      title: "", // titolo non valido
      start_time: now.toISOString(),
      end_time: later.toISOString(),
      reason: "Motivo prova",
    };

    await middleware(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ errors: expect.any(Array) })
    );
  });
});
