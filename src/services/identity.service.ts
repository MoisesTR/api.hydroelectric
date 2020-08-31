import bcrypt from 'bcryptjs';
import connector from '../common/persistence/mssql.persistence';
import ApplicationException from '../common/exceptions/application.exception';
import { UserH } from '../domain/interfaces/user-h';
import SimpleQuery from '../common/sql/simple.query';
import nameofFactory from '../common/factory/name-of-factory';
import { LoggedUserDto } from '../dtos/logged-user.dto';

export default class IdentityService {
    private nameOf = nameofFactory<UserH>();

    public async authenticate(userName: string, password: string): Promise<LoggedUserDto | null> {
        const query = new SimpleQuery<UserH>(`
            SELECT firstName = FirstName, lastName = LastName, password = Password, enabled = Enabled 
            FROM UserH WHERE UserName = ${this.nameOf('userName')}
        `);

        query.setParam('userName', userName);
        const user = await query.getSingleResult();

        if (user) {
            this.validateUser(user, password);
            const userInfo: LoggedUserDto = {
                userName,
                firstName: user.firstName,
                lastName: user.lastName
            };
            return userInfo;
        }
        throw new ApplicationException('El usuario no existe en el sistema!');
    }

    private validateUser(user: UserH, password: string) {
        this.validateStateUser(user.enabled);
        this.validatePassword(user.password, password);
    }

    private validateStateUser(enabled: boolean) {
        if (!enabled) {
            throw new ApplicationException('El usuario se encuentra inhabilitado!');
        }
    }

    private async validatePassword(hashedPassword: string, password: string) {
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (!validPassword) {
            throw new ApplicationException('La contraseña es incorrecta, intentalo nuevamente');
        }
    }
}
