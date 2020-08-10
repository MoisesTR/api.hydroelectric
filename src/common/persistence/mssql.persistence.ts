import { ConnectionPool } from 'mssql';

const config = {
    server: process.env.db_mssql_server as string,
    database: process.env.db_mssql_database as string,
    user: process.env.db_mssql_user as string,
    password: process.env.db_mssql_password as string,
    options: {
        enableArithAbort: true
    }
};

const environment = process.env.NODE_ENV;
if (environment === 'development') {
    console.log(config);
}

export default new ConnectionPool(config).connect();
