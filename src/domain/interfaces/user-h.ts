import { Audit } from '../../interfaces/audit';
import { Rol } from './rol';

export interface UserH extends Audit {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    roles: Rol[];
}
