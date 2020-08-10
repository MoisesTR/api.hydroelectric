import connector from '../../common/persistence/mssql.persistence';
import { UserRepository } from '../user.repository';
import { UserH } from '../../domain/interfaces/user-h';

const baseSelect = `SELECT  userId = UserId, userName = UserName, firstName = FirstName,
                            lastName = LastName, createdAt = CreatedAt, createdBy = CreatedBy,
                            updatedAt = UpdatedAt, updatedBy = UpdatedBy
                    FROM UserH `;

export default class UserRepositoryImpl implements UserRepository {
    public async all(): Promise<UserH[]> {
        const pool = await connector;
        const result = await pool.query(`${baseSelect} ORDER BY 1 DESC`);

        return result.recordset;
    }

    public async find(id: number): Promise<UserH | null> {
        const pool = await connector;
        const result = await pool.query`
            SELECT  userId = UserId, userName = UserName, firstName = FirstName,
                    lastName = LastName, createdAt = CreatedAt, createdBy = CreatedBy,
                    updatedAt = UpdatedAt, updatedBy = UpdatedBy
            FROM UserH  
            WHERE UserId = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async findByUserName(userName: string): Promise<UserH | null> {
        const pool = await connector;
        const result = await pool.query`
            SELECT  userId = UserId, userName = UserName, firstName = FirstName,
                    lastName = LastName, createdAt = CreatedAt, createdBy = CreatedBy,
                    updatedAt = UpdatedAt, updatedBy = UpdatedBy
            FROM UserH   
            WHERE UserName = ${userName}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async store(user: UserH): Promise<void> {
        const pool = await connector;
        const now = new Date();

        await pool.query`INSERT INTO UserH(UserName, FirstName, LastName, CreatedAt, CreatedBy)
             VALUES(${user.userName}, ${user.firstName}, ${user.lastName}, ${now}, ${user.createdBy})
            `;
    }

    public async update(user: UserH): Promise<void> {
        const pool = await connector;
        const now = new Date();

        await pool.query`UPDATE UserH 
             SET FirstName = ${user.firstName}
                , LastName = ${user.lastName}
                , UpdatedAt = ${now}
                , UpdatedBy = ${user.updatedBy}
             `;
    }

    public async remove(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
