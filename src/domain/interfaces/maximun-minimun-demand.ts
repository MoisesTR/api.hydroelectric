import { Audit } from '../../interfaces/audit';

export interface MaximunMinimunDemand extends Audit {
    maximunMinimunDemandId: number;
    unitWorkId: number;
    registerDate: Date;
    maximunDemand: number;
    maximunDemandHour: number;
    minimunDemand: number;
    minimunDemandHour: number;
}
