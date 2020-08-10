import { Audit } from '../../interfaces/audit';

export interface HydrologicalBalance extends Audit {
    hydrologicalBalanceId: number;
    energySentWh: number;
    energySentMwh: number;
    energyReceivedWh: number;
    energyReceivedKwh: number;
    InitialLevelMsnm: number;
    initialVolUtilMiles: number;
    reservoirFlowContribution: number;
    reservoirSupplyVolumeMiles: number;
    ecologicalExtractionReservoir: number;
    turbinatedExtractionReservoir: number;
    leakExtractionReservoir: number;
    ecologicalExtractionReservoirMiles: number;
    turbinatedExtractionReservoirMiles: number;
    leakExtractionReservoirMiles: number;
    finalLevelMsnm: number;
    finalVolumeUtilMiles: number;
}
