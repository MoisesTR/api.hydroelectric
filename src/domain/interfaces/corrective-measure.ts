import { Audit } from '../../interfaces/audit';

export interface CorrectiveMeasure extends Audit {
    correctiveMeasureId: number;
    name: string;
    description: string;
}
