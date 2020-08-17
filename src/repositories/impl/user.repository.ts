import { UserRepository } from '../user.repository';
import { UserH } from '../../domain/interfaces/user-h';
import { BASE_SELECT } from '../../common/statements/user.statement';
import SimpleQuery from '../../common/sql/simple.query';

export default class UserRepositoryImpl implements UserRepository {
    public async all(): Promise<UserH[]> {
        const query = new SimpleQuery<UserH>(`${BASE_SELECT} ORDER BY UserId DESC`);
        return query.getResultList();
    }

    public async find(id: number): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`${BASE_SELECT} WHERE UserId = @UserId`);
        query.setParam('UserId', id);
        return query.getSingleResult();
    }

    public async findByUserName(userName: string): Promise<UserH | null> {
        const query = new SimpleQuery<UserH>(`${BASE_SELECT} WHERE UserName = @UserName`);
        query.setParam('UserName', userName);
        return query.getSingleResult();
    }

    public async store(user: UserH): Promise<number> {
        const query = new SimpleQuery(`
            INSERT INTO UserH(UserName, FirstName, LastName, Password, CreatedAt, CreatedBy)
            VALUES(@UserName, @FirstName, @LastName, @Password, @CreatedAt, @CreatedBy)
        `);
        query.setParam('UserName', user.userName);
        query.setParam('FirstName', user.firstName);
        query.setParam('LastName', user.lastName);
        query.setParam('Password', user.password);
        query.setParam('CreatedAt', new Date());
        query.setParam('CreatedBy', user.createdBy);

        return query.executeUpdate();
    }

    public async update(user: UserH): Promise<number> {
        const query = new SimpleQuery(`
            UPDATE  UserH 
            SET     FirstName = @FirstName,
                    LastName = @LastName,
                    UpdatedAt = @UpdatedAt,
                    UpdatedBy = @UpdatedBy
            WHERE   UserId = @UserId
        `);

        query.setParam('FirstName', user.firstName);
        query.setParam('LastName', user.lastName);
        query.setParam('UpdatedAt', new Date());
        query.setParam('UpdatedBy', user.updatedBy);
        query.setParam('UserId', user.userId);

        return query.executeUpdate();
    }

    public async changeState(user: UserH): Promise<number> {
        const query = new SimpleQuery(`
            UPDATE  UserH 
            SET     Enabled = @Enabled,
                    UpdatedAt = @UpdatedAt,
                    UpdatedBy = @UpdatedBy
            WHERE   UserId = @UserId
        `);

        query.setParam('Enabled', user.enabled);
        query.setParam('UpdatedBy', user.updatedBy);
        query.setParam('UpdatedAt', new Date());
        query.setParam('UserId', user.userId);

        return query.executeUpdate();
    }
}
