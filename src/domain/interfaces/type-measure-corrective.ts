import { Audit } from '../../interfaces/audit';

export interface TypeMeasureCorrective extends Audit {
    typeMeasureCorrectiveId: number;
    name: string;
    description: string;
}
