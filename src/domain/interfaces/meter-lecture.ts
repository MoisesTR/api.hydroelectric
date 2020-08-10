import { Audit } from '../../interfaces/audit';

export interface MeterLecture extends Audit {
    meterLectureId: number;
    lectureDate: Date;
    bruteU1: number;
    barU1: number;
    bruteU2: number;
    barU2: number;
    ltSent: number;
    ltReceived: number;
    hydrologicalBalanceId: number;
}
