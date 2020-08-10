import { RolRepository } from '../rol.repository';
import { Rol } from '../../domain/interfaces/rol';
import connector from '../../common/persistence/mssql.persistence';

const baseSelect = `SELECT rolId = RolId, rolName = RolName, rolDescription = RolDescription, 
                            createdAt = CreatedAt, createdBy = CreatedBy, updatedAt = UpdatedAt, updatedBy = UpdatedBy
                    FROM Rol`;

export default class RolRepositoryImpl implements RolRepository {
    public async all(): Promise<Rol[]> {
        const pool = await connector;
        const result = await pool.query(`${baseSelect} ORDER BY rolId ASC`);

        return result.recordset;
    }

    public async find(id: number): Promise<Rol | null> {
        const pool = await connector;
        const result = await pool.query`
                SELECT rolId = RolId, rolName = RolName, rolDescription = RolDescription, 
                        createdAt = CreatedAt, createdBy = CreatedBy, updatedAt = UpdatedAt, updatedBy = UpdatedBy
                FROM Rol     
                WHERE RolId = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async findByRolName(rolName: string): Promise<Rol | null> {
        const pool = await connector;
        const result = await pool.query`
                SELECT rolId = RolId, rolName = RolName, rolDescription = RolDescription, 
                        createdAt = CreatedAt, createdBy = CreatedBy, updatedAt = UpdatedAt, updatedBy = UpdatedBy
                FROM Rol      
                WHERE RolName = ${rolName}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async store(rol: Rol): Promise<void> {
        const pool = await connector;
        const now = new Date();

        await pool.query`INSERT INTO Rol(RolName, RolDescription, CreatedAt, CreatedBy)
             VALUES(${rol.rolName}, ${rol.rolDescription}, ${now}, ${rol.createdBy})`;
    }

    public async update(rol: Rol): Promise<void> {
        const pool = await connector;
        const now = new Date();

        await pool.query`UPDATE Rol 
             SET    RolName = ${rol.rolName}
                    , RolDescription = ${rol.rolDescription}
                    , UpdatedAt = ${now}
                    , UpdatedBy = ${rol.updatedBy}
            `;
    }

    public async remove(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
