import { Audit } from '../../interfaces/audit';

export interface PressureMeter extends Audit {
    pressureMeterId: number;
    unitWorkId: number;
    measurementDate: Date;
    forcedPipeline: number;
    spiralBox: number;
    diffuserTube: number;
    pressTurboDs: number;
    beforeFilter: number;
    afterFilter: number;
    inBearDsRad: number;
    outBearDsRad: number;
    waterPressureSeal: number;
    waterFlowSeal: number;
    systemPressure: number;
    servoMotorPressure: number;
}
