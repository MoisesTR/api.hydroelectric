import { Audit } from '../../interfaces/audit';

export interface WorkedHour extends Audit {
    workedHourId: number;
    unitWorkId: number;
    workedDate: Date;
    entryHour: string;
    exitHour?: string;
}
