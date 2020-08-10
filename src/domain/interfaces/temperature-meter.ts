import { Audit } from '../../interfaces/audit';

export interface TemperatureMeter extends Audit {
    temperatureMeterId: number;
    unitWorkId: number;
    meterHour: string;
    phaseR: number;
    phaseS: number;
    phaseT: number;
    statorU: number;
    statorV: number;
    statorW: number;
    bearDsRad: number;
    bearNdsRad: number;
    bearNdsAx: number;
    hotAir: number;
    regulatorOilTank: number;
}
