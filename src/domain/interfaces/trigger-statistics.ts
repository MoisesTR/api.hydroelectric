import { Audit } from '../../interfaces/audit';

export interface TriggerStatistics extends Audit {
    triggerStatisticsId: number;
    eventNumber: number;
    eventDate: Date;
    triggerHour: string;
    normalizationHourLt: string;
    availabilityHourPhsm: number;
    observation: string;
    potency: number;
    leak: number;
}
