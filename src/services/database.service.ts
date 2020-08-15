import sql, { Request, ISqlTypeFactory, IResult } from 'mssql';
import connector from '../common/persistence/mssql.persistence';
import { SqlException } from '../common/exceptions/sql.exception';

const rowHasData = (result: IResult<any>) => result.recordset[0];

interface params {
    pMode: number;
    pName: string;
    pValue: any;
    pType?: ISqlTypeFactory;
}

const pushParams = (params: params[], mode: number, name: string, value: any, type?: ISqlTypeFactory) => {
    params.push({
        pMode: mode,
        pName: name,
        pValue: value,
        pType: type
    });
};

function pushInputParams(params: params[], name: string, value: any, type?: ISqlTypeFactory) {
    pushParams(params, 1, name, value, type);
}

function pushOuputParams(params: params[], name: string, value: any, type?: ISqlTypeFactory) {
    pushParams(params, 2, name, value, type);
}

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

async function executeQuery(query: string, parameters?: params[]): Promise<IResult<any>> {
    try {
        const request = await getPoolRequest();
        if (parameters) parameters.forEach((parameter: params) => addParams(request, parameter));

        console.log(`\r\nExecuting ${query}`);
        const result = await request.query(query);
        return result;
    } catch (err) {
        throw new SqlException(err);
    }
}

async function executeStoreProcedure(nameSp: string, parameters?: params[]): Promise<IResult<any>> {
    try {
        const request = await getPoolRequest();
        if (parameters) parameters.forEach((parameter: params) => addParams(request, parameter));

        console.log(`\r\nExecuting ${nameSp}`);
        const result = await request.execute(nameSp);
        return result;
    } catch (err) {
        throw new SqlException(err);
    }
}

export { sql, connector, rowHasData, pushInputParams, pushOuputParams, executeQuery, executeStoreProcedure };
