import { UserPayload } from "./userPayload.js";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
            role?: string;
        }
    }
}