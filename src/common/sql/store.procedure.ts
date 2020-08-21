import { ISqlTypeFactory, executeStoreProcedure, IResult } from '../services/database.service';
import Query from './query';

export default class StoreProcedure<T> extends Query<T> {
    private spName: string;

    constructor(spName: string) {
        super();
        this.spName = spName;
    }

    setOutputParam(name: string, value: any, type?: ISqlTypeFactory) {
        if (this.params) {
            this.params.push({ pMode: 2, pName: name, pValue: value, pType: type });
        }
    }

    async execute(): Promise<IResult<T>> {
        return executeStoreProcedure(this.spName, this.params);
    }

    async getSingleResult(): Promise<T | null> {
        const result = await this.execute();

        return result.recordset[0] || null;
    }

    async getResultList(): Promise<T[]> {
        const result = await this.execute();

        return result.recordset;
    }

    async executeUpdate(): Promise<number> {
        const result = await this.execute();
        const rowsAffectedArray: number[] = result.rowsAffected;

        const rowsAffected = rowsAffectedArray.reduce((a, b) => a + b);

        return rowsAffected;
    }
}
