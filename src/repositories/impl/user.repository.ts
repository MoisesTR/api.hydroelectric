import bcrypt from 'bcryptjs';
import connector from '../../common/persistence/mssql.persistence';
import { UserRepository } from '../user.repository';
import { UserH } from '../../domain/interfaces/user-h';
import BASE_SELECT from '../../common/statements/user.statement';
import SimpleQuery from '../../common/sql/simple.query';
import nameofFactory from '../../common/factory/name-of-factory';

export default class UserRepositoryImpl implements UserRepository {
    private nameOf = nameofFactory<UserH>();

    public async all(): Promise<UserH[]> {
        const pool = await connector;
        const result = await pool.query(`${BASE_SELECT} ORDER BY 1 DESC`);

        return result.recordset;
    }

    public async find(id: number): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`${BASE_SELECT} WHERE UserId = ${this.nameOf('userId')}`);
        query.setParam('userId', id);
        return query.getSingleResult();
    }

    public async findByUserName(userName: string): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`${BASE_SELECT} WHERE UserName = ${this.nameOf('userName')}`);
        query.setParam('userName', userName);
        return query.getSingleResult();
    }

    public async store(user: UserH): Promise<number> {
        const query = new SimpleQuery<UserH>(`
            INSERT INTO UserH(UserName, FirstName, LastName, Password, CreatedBy)
            VALUES (
                ${this.nameOf('userName')}, ${this.nameOf('firstName')}
                , ${this.nameOf('lastName')}, ${this.nameOf('password')}
                , ${this.nameOf('createdBy')}
            )
        `);

        const passwordHashed = await bcrypt.hash(user.password, 10);

        query.setParam('userName', user.userName);
        query.setParam('firstName', user.firstName);
        query.setParam('lastName', user.lastName);
        query.setParam('password', passwordHashed);
        query.setParam('createdBy', user.createdBy);

        return query.executeUpdate();
    }

    public async update(user: UserH): Promise<number> {
        const query = new SimpleQuery<UserH>(`
            UPDATE  UserH
            SET     FirstName = ${this.nameOf('firstName')}
                    , LastName = ${this.nameOf('lastName')}
                    , UpdatedBy = ${this.nameOf('updatedBy')}
            WHERE   UserId = ${this.nameOf('userId')}
        `);

        query.setParam('firstName', user.updatedBy);
        query.setParam('lastName', user.updatedBy);
        query.setParam('updatedBy', user.updatedBy);
        query.setParam('userId', user.updatedBy);

        return query.executeUpdate();
    }

    public async changeState(user: UserH): Promise<number> {
        const query = new SimpleQuery<UserH>(`
            UPDATE  UserH
            SET     Enabled = ${this.nameOf('enabled')}
                    , UpdatedBy = ${this.nameOf('updatedBy')}
            WHERE   UserId = ${this.nameOf('userId')}
        `);

        query.setParam('enabled', user.enabled);
        query.setParam('updatedBy', user.updatedBy);
        query.setParam('userId', user.userId);
        return query.executeUpdate();
    }
}
