import { Audit } from '../../interfaces/audit';

export interface FailureTechniqueType extends Audit {
    failureTechniqueTypeId: number;
    name: string;
    description: string;
}
