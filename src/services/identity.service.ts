import connector from '../common/persistence/mssql.persistence';
import ApplicationException from '../common/exceptions/application.exception';
import { UserH } from '../domain/interfaces/user-h';
import SimpleQuery from '../common/sql/simple.query';

export default class IdentityService {
    public async authenticate(userName: string, password: string): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`
            SELECT firstName = FirstName, lastName = LastName 
            FROM UserH WHERE UserName = @UserName AND Password = @Password
        `);

        query.setParam('UserName', userName);
        query.setParam('Password', password);
        const user = await query.getSingleResult();

        if (!user) {
            throw new ApplicationException('Las credenciales son invalidas');
        }

        return user;
    }
}
