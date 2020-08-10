import { Audit } from '../../interfaces/audit';

export interface UnitWork extends Audit {
    unitWorkId: number;
    unitName: string;
    unitDescription: string;
}
