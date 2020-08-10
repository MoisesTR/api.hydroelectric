import { Audit } from '../../interfaces/audit';

export interface EventH extends Audit {
    eventHId: number;
    eventTypeId: number;
}
