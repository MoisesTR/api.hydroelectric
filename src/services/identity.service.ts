import connector from '../common/persistence/mssql.persistence';
import ApplicationException from '../common/exceptions/application.exception';
import { UserH } from '../domain/interfaces/user-h';
import SimpleQuery from '../common/sql/simple.query';
import nameofFactory from '../common/factory/name-of-factory';

export default class IdentityService {
    private nameOf = nameofFactory<UserH>();

    public async authenticate(userName: string, password: string): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`
            SELECT firstName = FirstName, lastName = LastName 
            FROM UserH WHERE UserName = ${this.nameOf('userName')} AND Password = ${this.nameOf('password')}
        `);

        query.setParam('userName', userName);
        query.setParam('password', password);
        const user = await query.getSingleResult();

        if (!user) {
            throw new ApplicationException('Las credenciales son invalidas');
        }

        return user;
    }
}
