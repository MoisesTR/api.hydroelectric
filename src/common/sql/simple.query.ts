import { executeQuery, IResult } from '../services/database.service';
import Query from './query';

export default class SimpleQuery<T> extends Query<T> {
    private sqlQuery: string;

    constructor(sqlQuery: string) {
        super();
        this.sqlQuery = sqlQuery;
    }

    protected async execute(): Promise<IResult<T>> {
        return executeQuery(this.sqlQuery, this.params);
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
