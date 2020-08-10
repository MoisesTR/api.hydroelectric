import { AuxiliaryServiceDet } from './auxiliary-service-det';
import { Audit } from '../../interfaces/audit';

export interface AuxiliaryService extends Audit {
    auxiliaryServiceId: number;
    registerDate: Date;
    voltageBar: number;
    rectifierId: number;
    unitWorkId: number;
    levelBeforeGrill: number;
    levelAfterGrill: number;
    fisicLevel: number;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    updatedBy?: string;
    detail: AuxiliaryServiceDet[];
}
