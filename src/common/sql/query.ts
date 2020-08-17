import { SqlParam, ISqlTypeFactory, IResult } from '../services/database.service';

export default abstract class Query<T> {
    protected params?: SqlParam[] = [];

    setParam(pName: string, pValue: any, pType?: ISqlTypeFactory) {
        if (this.params) {
            this.params.push({ pMode: 1, pName, pValue, pType });
        }
    }

    protected abstract async execute(): Promise<IResult<T>>;

    protected abstract async getSingleResult(): Promise<T | null>;

    protected abstract async getResultList(): Promise<T[]>;

    protected abstract async executeUpdate(): Promise<number>;
}
