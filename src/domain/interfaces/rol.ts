import { Audit } from '../../interfaces/audit';

export interface Rol extends Audit {
    rolId: number;
    rolName: string;
    rolDescription: string;
}
