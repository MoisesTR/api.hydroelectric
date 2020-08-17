import { ISqlTypeFactory } from 'mssql';
export interface SqlParam {
    pMode: number;
    pName: string;
    pValue: any;
    pType?: ISqlTypeFactory;
}
