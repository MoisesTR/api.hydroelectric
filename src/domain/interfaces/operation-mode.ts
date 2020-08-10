import { Audit } from '../../interfaces/audit';

export interface OperationMode extends Audit {
    operationModeId: number;
    name: string;
    type: string;
    description: string;
}
