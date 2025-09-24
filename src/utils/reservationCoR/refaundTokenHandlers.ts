import { DomainReservation } from "../../domain/reservation";

export interface RefundPolicyHandler {
    setNext(handler: RefundPolicyHandler): RefundPolicyHandler;
    calculate(reservation: DomainReservation, costPerHour: number): number;
}

export abstract class AbstractRefundPolicyHandler implements RefundPolicyHandler {
    private nextHandler: RefundPolicyHandler | null = null;

    public setNext(handler: RefundPolicyHandler): RefundPolicyHandler {
        this.nextHandler = handler;
        return handler;
    }

    public calculate(reservation: DomainReservation, costPerHour: number): number {
        const result = this.apply(reservation, costPerHour);
        if (result !== null) return result;
        if (this.nextHandler) return this.nextHandler.calculate(reservation, costPerHour);
        return 0;
    }

    protected abstract apply(reservation: DomainReservation, costPerHour: number): number | null;
}

export class OngoingReservationRefundHandler extends AbstractRefundPolicyHandler {
    protected apply(reservation: DomainReservation, costPerHour: number): number | null {
        const now = new Date();

        if (now >= reservation.start && now < reservation.end) {
            const unusedHours = reservation.getHoursNotUsed();
            const refund = (unusedHours * costPerHour) - 2; 
            return Math.max(refund, 0); // prendo il valore massimo per non restituire 0 token
        }

        return null; // passa al prossimo handler
    }
}


export class FutureReservationRefundHandler extends AbstractRefundPolicyHandler {
    protected apply(reservation: DomainReservation, costPerHour: number): number | null {
        const now = new Date();

        if (now < reservation.start) {
            const unusedHours = reservation.getHoursNotUsed();
            const refund = (unusedHours * costPerHour) - 1;
            return Math.max(refund, 0);
        }

        return null;
    }
}


export class NoRefundHandler extends AbstractRefundPolicyHandler {
    protected apply(reservation: DomainReservation, costPerHour: number): number | null {
        return 0; //chiude la catena senza rimborso
    }
}


export function buildRefundPolicyChain(): RefundPolicyHandler {
        const ongoing = new OngoingReservationRefundHandler();
        const future = new FutureReservationRefundHandler();
        const noRefund = new NoRefundHandler();

        ongoing.setNext(future).setNext(noRefund);
        return ongoing;
    }
