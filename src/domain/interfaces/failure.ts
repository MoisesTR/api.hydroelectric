import { Audit } from '../../interfaces/audit';

export interface Failure extends Audit {
    failureId: number;
    failureTechniqueTypeId: number;
    description: string;
    correctiveMeasure: string;
    typeMeasureCorrectiveId: number;
    activePotency: number;
    reactivePotency: number;
    operationModeV: number;
    operationModeT: number;
}
