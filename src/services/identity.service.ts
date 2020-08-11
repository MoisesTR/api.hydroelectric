import connector from '../common/persistence/mssql.persistence';
import ApplicationException from '../common/exceptions/application.exception';
import { UserH } from '../domain/interfaces/user-h';

export default class IdentityService {
    public async authenticate(userName: string, password: string): Promise<UserH> {
        const pool = await connector;

        const result = await pool.query`SELECT firstName = FirstName, lastName = LastName FROM UserH WHERE UserName = ${userName} AND Password = ${password}`;

        if (result.recordsets[0].length > 0) {
            return result.recordset[0];
        }

        throw new ApplicationException('Las credenciales son invalidas!');
    }
}
