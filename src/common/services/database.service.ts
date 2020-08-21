import sql, { Request, ISqlTypeFactory, IResult } from 'mssql';
import connector from '../persistence/mssql.persistence';
import { SqlException } from '../exceptions/sql.exception';
import { SqlParam } from '../../interfaces/sql.param';

const getPoolRequest = async () => {
    const pool = await connector;
    const request = pool.request();
    return request;
};

// PMODE = 1 -INPUT PARAMS
// PMODE = 2- OUPUT PARAMS
const addParams = (request: Request, parameter: any) => {
    if (parameter.pMode === 1) {
        if (parameter.pType) {
            request.input(parameter.pName, parameter.pType, parameter.pValue);
        } else {
            request.input(parameter.pName, parameter.pValue);
        }
    } else {
        request.output(parameter.pName, parameter.pType);
    }
};

async function executeQuery(query: string, parameters?: SqlParam[]): Promise<IResult<any>> {
    try {
        const request = await getPoolRequest();
        if (parameters) parameters.forEach((parameter: SqlParam) => addParams(request, parameter));

        console.log(`\r\nExecuting ${query}`);
        const result = await request.query(query);
        return result;
    } catch (err) {
        throw new SqlException(err);
    }
}

async function executeStoreProcedure(nameSp: string, parameters?: SqlParam[]): Promise<IResult<any>> {
    try {
        const request = await getPoolRequest();
        if (parameters) parameters.forEach((parameter: SqlParam) => addParams(request, parameter));

        console.log(`\r\nExecuting ${nameSp}`);
        const result = await request.execute(nameSp);
        return result;
    } catch (err) {
        throw new SqlException(err);
    }
}

export { sql, connector, executeQuery, executeStoreProcedure, ISqlTypeFactory, IResult, SqlParam };
