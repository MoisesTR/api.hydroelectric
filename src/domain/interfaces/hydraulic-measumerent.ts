import { Audit } from '../../interfaces/audit';

export interface HydraulicMeasumerent extends Audit {
    hydraulicMeasumerentId: number;
    measumerentDate: Date;
    pluvioMeterHour: string;
    valuePluviometer: number;
    revervoirLevelHour: string;
    reservoirLevelValue: number;
}
