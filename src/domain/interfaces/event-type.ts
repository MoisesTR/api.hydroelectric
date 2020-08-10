import { Audit } from '../../interfaces/audit';

export interface EventType extends Audit {
    eventTypeId: number;
    name: string;
    description: string;
}
