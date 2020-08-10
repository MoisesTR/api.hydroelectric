import { Audit } from '../../interfaces/audit';

export interface TriggerReason extends Audit {
    triggerReasonId: number;
    description: string;
}
